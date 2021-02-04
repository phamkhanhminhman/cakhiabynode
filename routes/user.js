var express = require('express')
var router = express.Router()
const validator = require('../helpers/validator')
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController')
const AuthMiddleWare = require("../middleware/AuthMiddleware")

router.use(AuthMiddleWare.isAuth);

router.get("/list", UserController.list);

router.get("/:userID", UserController.show);

router.put("/:userID", validator.validateRegisterUser(), UserController.update);

router.delete("/:userID", UserController.remove);

module.exports = router