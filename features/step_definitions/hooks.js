var nodemailer = require('nodemailer');
var config = require('../../config');
var transporter = nodemailer.createTransport(config.mail);

function sendMail(attachments) {
    var attachments = attachments.map((attachment) => ({ path: attachment }));
    var mailOptions = {
        from: config.mail.auth.user,
        to: config.mail.auth.user,
        subject: 'UZ booking: tickets found!',
        text: 'UZ booking: tickets found! See attached screenshots',
        attachments: attachments
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log('error' + error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function sendNotification(scenarioResult, screenshots) {
  if (scenarioResult.status === 'passed' && config.notificationsEnabled.includes('mail')) {
    sendMail(screenshots);
  }
}

module.exports = function () {
  this.After(function(scenarioResult) {
    sendNotification(scenarioResult, this.screenshots);
  });
};