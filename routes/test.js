var express = require('express')
var router = express.Router()
const AuthMiddleWare = require("../middleware/AuthMiddleware")
const testController = require('../controllers/test');
const UploadMiddleWare = require('../middleware/UploadMiddleware');
const multer = require('multer');
const response = require('../utils/response');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// router.use(AuthMiddleWare.isAuth);
// define the home page route
router.get('/', testController.index)
// define the about route

router.get('/create', testController.create)

router.post('/uploadFile', testController.apiUpload);

router.post('/uploadmultiple', testController.apiUploads);

// router.post('/uploadfile', UploadMiddleWare.upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
//   }
//   return response.withMessage("COMMON.SUCCESSFULLY", true, file, res)
// })

//Uploading multiple files
// router.post('/uploadmultiple', UploadMiddleWare.upload.array('myFiles', 12), (req, res, next) => {
//   const files = req.files
//   if (!files) {
//     return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
//   }
//   return response.withMessage("COMMON.SUCCESSFULLY", true, files, res)
// })

module.exports = router