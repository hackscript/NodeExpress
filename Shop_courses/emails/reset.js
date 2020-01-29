const keys = require('../keys')

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Востановление пароля',
        html: `
        <h1>Вы забыли пароль?</h1>
        <p>Если нет, то проигнорируйте данное письмо</p>
        <p>Иначе нажмите на ссылку ниже:</p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Востановить доступ</a></p>
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсов</a>
        `
    }
}