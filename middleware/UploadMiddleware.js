const { response } = require('express');
const multer = require('multer');
const util = require("util");

const maxSize = 2 * 1024 * 1024;

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, + Date.now() + "-" + file.originalname)
    }
})

let uploadFiles = multer({ storage: storage, limits: { fileSize: maxSize } }).array("myFiles", 10);

let uploadFile = multer({ storage: storage, limits: { fileSize: maxSize } }).single("myFile");



let uploadFilesMiddleware = util.promisify(uploadFiles);

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = { single: uploadFileMiddleware, multiple: uploadFilesMiddleware }