"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Loki = require("lokijs");
var fs = require('fs');
var config = require("../../config/env/config")();
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var ImageController = (function () {
    function ImageController() {
        this.COLLECTION_NAME = "images";
        this.db = new Loki(config.uploadPath + "/" + config.db + ".json", {
            persistenceMethod: "fs"
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.file);
                        return [4 /*yield*/, fs.writeFile(req.file.filename, req.file)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.sendStatus(400);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ImageController;
}());
exports.default = new ImageController();
