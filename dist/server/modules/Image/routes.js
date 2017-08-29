"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var ImageRoutes = (function () {
    function ImageRoutes() {
    }
    ImageRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    ImageRoutes.prototype.findOne = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    ImageRoutes.prototype.create = function (req, res) {
        return controller_1.default.createImage(req, res);
    };
    ImageRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateImage(req, res);
    };
    ImageRoutes.prototype.destroy = function (req, res) {
        return controller_1.default.deleteImage(req, res);
    };
    ImageRoutes.prototype.upload = function (req, res) {
        return controller_1.default.uploadImage(req, res);
    };
    return ImageRoutes;
}());
exports.default = new ImageRoutes();
