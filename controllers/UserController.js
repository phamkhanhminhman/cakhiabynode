const response = require('../utils/response');
const sequelize = require('../utils/connectDB')
const User = require('../models/User');

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

let update = async (req, res) => {
    
}

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
    remove: remove
}