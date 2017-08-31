"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var morgan = require("morgan");
var auth_1 = require("../auth");
var handlers_1 = require("./responses/handlers");
var routes_1 = require("./routes/routes");
var Api = (function () {
    function Api() {
        this.config = require("../../server/config/env/config")();
        this.express = express();
        this.middleware();
    }
    Api.prototype.middleware = function () {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(express.static(this.config.uploadPath));
        this.express.use(cors());
        this.express.use(handlers_1.default.errorHandlerApi);
        this.express.use(auth_1.default.config().initialize());
        this.router(this.express, auth_1.default);
    };
    Api.prototype.router = function (app, auth) {
        routes_1.default.initRoutes(app, auth);
    };
    return Api;
}());
exports.default = new Api().express;
