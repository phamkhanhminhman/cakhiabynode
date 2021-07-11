// const success = require('../utils/response');
const response = require('../utils/response')
const sequelize = require('../utils/connectDB')
const User = require('../models/User');
const UploadMiddleware = require('../middleware/UploadMiddleware');

function create(req, res) {

    let data = [{
        'name': "Minh",
        'year': "2020"
    },
    {
        'name': "Man",
        'year': "2021"
    }
    ];
    response.withMessage("COMMON.SUCCESSFULLY", true, data, res);
}

async function index(req, res) {
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    return response.withMessage("COMMON.SUCCESSFULLY", true, users, res)
}

const apiUpload = async (req, res) => {
    try {
        await UploadMiddleware.single(req, res)
        //CHECK FILE TYPE
        let mimetype = ["image/png", "image/jpeg"];
        if (mimetype.indexOf(req.file.mimetype) === -1) {
            return response.withMessage("COMMON.INVALID_DATA", false, null, res)  
        }
        if (!req.file) {
            return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
        }
        return response.withMessage("COMMON.SUCCESSFULLY", true, req.file, res)
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return response.errorServices("FILE.TOO_LARGE", res)
        }
    }
}

const apiUploads = async (req, res) => {
    try {
        await UploadMiddleware.multiple(req, res)
        //CHECK FILE TYPE
        let mimetype = ["image/png", "image/jpeg"];
        req.files.forEach(element => {
            if (mimetype.indexOf(element.mimetype) === -1) {
                return response.withMessage("COMMON.INVALID_DATA", false, null, res)  
            }
        });
        if (req.files.length === 0) {
            return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
        }
        return response.withMessage("COMMON.SUCCESSFULLY", true, req.files, res)
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return response.errorServices("FILE.TOO_LARGE", res)
        }
    }
}
module.exports = {
    create,
    index,
    apiUpload,
    apiUploads
}