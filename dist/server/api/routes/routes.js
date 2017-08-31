"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../../modules/auth/auth");
var routes_1 = require("../../modules/Image/routes");
var routes_2 = require("../../modules/User/routes");
var config = require("../../config/env/config")();
var Routes = (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app
            .route("/api/users/all")
            .get(routes_2.default.index);
        app
            .route("/api/users/:id")
            .get(routes_2.default.findOne);
        app
            .route("/api/users/create")
            .post(routes_2.default.create);
        app
            .route("/api/users/:id/update")
            .put(routes_2.default.update);
        app
            .route("/api/users/:id/destroy")
            .delete(routes_2.default.destroy);
        app
            .route("/api/images/all")
            .get(routes_1.default.index);
        app
            .route("/api/images/:id")
            .get(routes_1.default.findOne);
        app
            .route("/api/images/create")
            .post(routes_1.default.create);
        app
            .route("/api/images/:id/update")
            .put(routes_1.default.update);
        app
            .route("/api/images/:id/destroy")
            .delete(routes_1.default.destroy);
        app
            .route("/upload")
            .post(routes_1.default.upload);
        app.route("/token").post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
