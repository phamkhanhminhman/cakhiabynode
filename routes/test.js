var express = require('express')
var router = express.Router()
const AuthMiddleWare = require("../middleware/AuthMiddleware")
const testController = require('../controllers/test');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.use(AuthMiddleWare.isAuth);
// define the home page route
router.get('/', testController.index)
// define the about route

router.get('/create', testController.create)

module.exports = router