module.exports = {
    screenshotDir: __dirname + '/screenshots',
    notificationsEnabled: ['mail'],
    mail: {
        service: 'Gmail',
        auth: {
            user: 'user@gmail.com',
            pass: 'password'
        }
    }
};
