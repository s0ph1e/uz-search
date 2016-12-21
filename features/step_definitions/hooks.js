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
    return transporter.sendMail(mailOptions).then(console.log);
}

function sendNotification(scenarioResult, screenshots) {
    if (scenarioResult.status === 'passed' && config.notificationsEnabled.includes('mail')) {
        return sendMail(screenshots);
    }
}

module.exports = function () {
    this.After(function (scenarioResult) {
        return sendNotification(scenarioResult, this.screenshots);
    });
};
