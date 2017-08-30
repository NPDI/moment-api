"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var fs = require("fs");
var multer = require("multer");
var config = require("../../config/env/config")();
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var ImageController = (function () {
    function ImageController() {
        var _this = this;
        this.dir = config.uploadPath;
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
        this.storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, _this.dir);
            },
            filename: function (req, file, callback) {
                var fileExtension = file.originalname.split(".").pop();
                callback(null, "file_" + Date.now() + "." + fileExtension);
            }
        });
        this.upload = multer({ storage: this.storage }).single("myfile");
    }
    ImageController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, "Erro ao buscar todos os imagem"));
    };
    ImageController.prototype.createImage = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, "Erro ao inserir novo imagem"));
    };
    ImageController.prototype.getById = function (req, res) {
        var ImageId = parseInt(req.params.id, 10);
        service_1.default.getById(ImageId)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, "Imagem não encontrado"));
    };
    ImageController.prototype.updateImage = function (req, res) {
        var ImageId = parseInt(req.params.id, 10);
        var props = req.body;
        service_1.default.update(ImageId, props)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, "Erro ao atualizar imagem"));
    };
    ImageController.prototype.deleteImage = function (req, res) {
        var imageId = parseInt(req.params.id, 10);
        service_1.default.delete(imageId)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, "Erro ao excluir imagem"));
    };
    ImageController.prototype.uploadImage = function (req, res) {
        this.upload(req, res, function (err) {
            if (err) {
                return handlers_1.default.onError(res, "Upload failed", err);
            }
            else {
                return handlers_1.default.onSucess(res, req.file);
            }
        });
    };
    return ImageController;
}());
exports.default = new ImageController();
