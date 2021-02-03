const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/connectDB');

const User = sequelize.define('User', {
    'id': {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    'username': {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: "null"
    },
    'password': {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "null"
    },
    'group_id': {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        comment: "null"
    },
    'thumbnail': {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "null"
    },
    'link': {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "null"
    },
    'dob': {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "null"
    },
    'sex': {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: "null"
    },
    'access_token': {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "null"
    },
    'refresh_token': {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "null"
    },
    'created_at': {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    'updated_at': {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    tableName: 'user',
    underscored: true,
    timestamps: false

});

module.exports = User