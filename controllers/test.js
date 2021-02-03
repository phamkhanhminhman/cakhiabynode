// const success = require('../utils/response');
const response = require('../utils/response')
const sequelize = require('../utils/connectDB')
const User = require('../models/User')

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


module.exports = {
    create,
    index
}