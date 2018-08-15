let {defineSupportCode} = require('cucumber');
let nodemailer = require('nodemailer');
let config = require('../../config');
let transporter = nodemailer.createTransport(config.mail);

function sendMail(attachments) {
    let mailOptions = {
        from: config.mail.auth.user,
        to: config.mail.auth.user,
        subject: 'UZ booking: tickets found!',
        text: 'UZ booking: tickets found! See attached screenshots',
        attachments: attachments.map((attachment) => ({path: attachment}))
    };
    return transporter.sendMail(mailOptions).then(console.log).catch(console.error);
}

function sendNotification(scenarioResult, screenshots) {
    if (scenarioResult.status === 'passed' && config.notificationsEnabled.includes('mail')) {
        return sendMail(screenshots);
    }
    return Promise.resolve();
}

defineSupportCode(function({After}) {
    After({timeout: 20 * 1000}, function (scenarioResult) {
        return sendNotification(scenarioResult, this.screenshots);
    });
});
