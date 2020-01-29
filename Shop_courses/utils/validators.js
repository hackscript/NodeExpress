const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Введите коректный email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Пароль должен быть минимум 6 символов')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm',)
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Пароли должны совпадать')
            }
            return true
        })
        .trim(),
    body('name')
        .isLength({min: 3})
        .withMessage('Имя должно быть минимум 3 символа')
        .trim()
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 сивола').trim(),
    body('price').isNumeric().withMessage('Введите коректную цену'),
    body('img', 'Введите коректный URL картинки').isURL()
]
