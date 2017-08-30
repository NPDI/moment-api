"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var model = require('../../models');
var Image = (function () {
    function Image() {
    }
    Image.prototype.create = function (img) {
        return model.Image.create(img);
    };
    Image.prototype.getAll = function () {
        return model.User.findAll({
            order: ['name'],
        })
            .then(interface_1.createImages);
    };
    Image.prototype.getById = function (id) {
        return model.Image.findOne({
            where: { id: id },
            include: [{
                    model: model.User,
                    as: 'User',
                }],
            order: ['name'],
        })
            .then(interface_1.createImageById);
    };
    Image.prototype.update = function (id, img) {
        return model.Image.update(img, {
            where: { id: id },
            fields: ['name', 'description'],
        });
    };
    Image.prototype.delete = function (id) {
        return model.Image.destroy({
            where: { id: id },
        });
    };
    return Image;
}());
exports.default = new Image();
