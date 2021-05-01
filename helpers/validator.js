const { check } = require('express-validator');
const User = require('../models/User');

let validateRegisterUser = () => {
    return [
        check('username').custom((value) => {
            return User.findOne({ where: { username: value } }).then(user => {
                if (user) {
                    return Promise.reject('Username is already in use')
                }
            })
        }),
        check('username', 'username does not Empty').not().isEmpty(),
        check('username', 'username must be Alphanumeric').isAlphanumeric(),
        check('password', 'password more than 6 digits').isLength({ min: 6 }),
        // check('email', 'Invalid does not Empty').not().isEmpty(),
        // check('email', 'Invalid email').isEmail(),
        check('dob', 'Invalid birthday').isISO8601('yyyy-mm-dd'),

    ];
}

let validateLogin = () => {
    return [
        check('username', 'Invalid does not Empty').not().isEmpty(),
        check('password', 'Invalid does not Empty').not().isEmpty(),
    ];
}

module.exports = {
    validateRegisterUser: validateRegisterUser,
    validateLogin: validateLogin
};