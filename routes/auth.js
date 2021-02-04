var express = require('express')
var router = express.Router()
const validator = require('../helpers/validator')
const AuthController = require('../controllers/AuthController');


router.post("/login", AuthController.login);

router.post("/signup", validator.validateRegisterUser(), AuthController.signup);

router.post("/refresh-token", AuthController.refreshToken);

module.exports = router