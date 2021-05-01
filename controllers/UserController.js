const response = require('../utils/response');
const sequelize = require('../utils/connectDB')
const User = require('../models/User');
const { validationResult } = require('express-validator');

//API LIST USER 
let listUser = async (req, res) => {
    try {
        const currentPage = req.query.page || 1
        const perPage = 2;
        let totalItems = await User.count();
        let users = await User.findAll({ limit: perPage, offset: (currentPage - 1) * perPage });
        users.totalItems = totalItems
        return response.withMessage("COMMON.SUCCESSFULLY", true, users, res)
    } catch (error) {
        return response.withMessage("ERROR_SERVER", false, null, res)
    }
}

//API SHOW USER BY ID
let show = async (req, res) => {
    const userID = req.params.userID;
    // SELECT * FROM user WHERE id = ?
    User.findByPk(userID)
        .then(user => {
            if (!user) {
                return response.withMessage("COMMON.NOT_FOUND", false, null, res)
            }
            return response.withMessage("COMMON.GET_SUCCESS", true, user, res)
        })
        .catch(err => {
            return response.withMessage("ERROR_SERVER", false, null, res)
        });
}

//API UPDATE USER BY ID
let update = async (req, res) => {
    const userID = req.params.userID;
    const userData = {
        'username': req.body.username,
        'password': req.body.password,
        'groupId': req.body.groupId,
        'thumbnail:': req.body.thumbnail,
        'link': req.body.link,
        'dob': req.body.dob,
        'sex': req.body.sex,
    }

    const errors = validationResult(req);
    //VALIDATE input data
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array()[0] });
        return response.withMessage("COMMON.INVALID_DATA", false, errors.array(), res)
    }
    //UPDATE user by id
    User.update({
        username: userData.username,
        groupId: userData.groupId,
        thumbnail: userData.thumbnail,
        link: userData.link,
        dob: userData.dob,
        sex: userData.sex,
    }, {
        where: {
            id: userID
        }
    });

    return response.withMessage("COMMON.UPDATE_SUCCESS", true, userData, res)
}

//API REMOVE USER BY ID
let remove = async (req, res) => {
    const userID = req.params.userID;
    // SELECT * FROM user WHERE id = ?
    User.findByPk(userID)
        .then(user => {
            if (!user) {
                return response.withMessage("COMMON.NOT_FOUND", false, null, res)
            }
            return user.destroy();
        })
        .then(() => {
            return response.withMessage("COMMON.DELETE_SUCCESS", true, null, res)
        })
        .catch(err => {
            return response.withMessage("ERROR_SERVER", false, null, res)
        });
}

module.exports = {
    list: listUser,
    show: show,
    update: update,
    remove: remove
}