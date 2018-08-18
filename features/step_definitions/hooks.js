let {defineSupportCode} = require('cucumber');
let nodemailer = require('nodemailer');
let config = require('../../config');
let transporter = nodemailer.createTransport(config.mail);

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.telegram.token);

function sendMail({attachments, url}) {
    let mailOptions = {
        from: config.mail.auth.user,
        to: config.mail.auth.user,
        subject: 'UZ booking: tickets found!',
        text: `UZ booking: tickets found! See attached screenshots. \n${url}`,
        attachments: attachments.map((attachment) => ({path: attachment}))
    };
    return transporter.sendMail(mailOptions).then(console.log).catch(console.error);
}

async function sendTelegramMessage({attachments, url}) {
    await bot.sendMessage(config.telegram.chat_id, `Tickets are found! ${url}`);

    for (let attachment of attachments) {
        await bot.sendDocument(config.telegram.chat_id, attachment);
    }
}

async function sendNotification(scenarioResult, {attachments, url}) {
    if (scenarioResult.status !== 'passed') {
        return;
    }

    if (config.notificationsEnabled.includes('mail')) {
        await sendMail({attachments, url});
    }

    if (config.notificationsEnabled.includes('telegram')) {
        await sendTelegramMessage({attachments, url});
    }
}

defineSupportCode(function({After}) {
    After({timeout: 20 * 1000}, function (scenarioResult) {
        return sendNotification(scenarioResult, {attachments: this.screenshots, url: this.url});
    });
});
