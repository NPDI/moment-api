"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../../modules/auth/auth");
var routes_1 = require("../../modules/Image/routes");
var routes_2 = require("../../modules/User/routes");
var Routes = (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(routes_2.default.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(routes_2.default.findOne);
        app.route('/api/users/create').all(auth.config().authenticate()).post(routes_2.default.create);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(routes_2.default.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(routes_2.default.destroy);
        app.route('/api/image/all').all(auth.config().authenticate()).get(routes_1.default.index);
        app.route('/api/image/:id').get(routes_1.default.findOne);
        app.route('/api/image/create').all(auth.config().authenticate()).post(routes_1.default.create);
        app.route('/api/image/:id/update').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/image/:id/destroy').all(auth.config().authenticate()).delete(routes_1.default.destroy);
        app.route('/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
