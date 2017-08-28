"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
function default_1(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Image, { as: 'images' });
            },
        },
    });
    User.beforeCreate(function (user) {
        return hashPassword(user);
    });
    User.beforeUpdate(function (user) {
        return hashPassword(user);
    });
    function hashPassword(user) {
        var salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
    }
    return User;
}
exports.default = default_1;
