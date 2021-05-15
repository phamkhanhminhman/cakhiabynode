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
        if (!req.file) {
            return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
        }
        return response.withMessage("COMMON.SUCCESSFULLY", true, req.file, res)
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                status: false,
                code: 422,
                message: "File size cannot be larger than 2MB!",
                server_time: new Date().toLocaleString()
            });
        }
    }
}

const apiUploads = async (req, res) => {
    try {
        await UploadMiddleware.multiple(req, res)
        if (!req.file) {
            return response.withMessage("COMMON.NO_FILE_PASS", false, null, res)
        }
        return response.withMessage("COMMON.SUCCESSFULLY", true, req.files, res)
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                status: false,
                code: 422,
                message: "File size cannot be larger than 2MB!",
                server_time: new Date().toLocaleString()
            });
        }
    }
}
module.exports = {
    create,
    index,
    apiUpload,
    apiUploads
}