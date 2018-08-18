module.exports = {
    screenshotDir: __dirname + '/screenshots',
    notificationsEnabled: ['mail', 'telegram'],
    mail: {
        service: 'Gmail',
        auth: {
            user: 'user@gmail.com',
            pass: 'password'
        }
    },
    telegram: {
        token: '',
        chat_id: ''
    }
};
