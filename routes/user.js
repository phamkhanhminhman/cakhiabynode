var express = require('express')
var router = express.Router()
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController')


router.get("/list", UserController.list);

router.get("/:userID", UserController.show);

router.delete("/:userID", UserController.remove);

module.exports = router