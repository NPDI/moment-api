"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/Image/service");
var model = require("../../server/models");
describe("Testes Unitarios do Image Service", function () {
    var defaultUser = {
        id: 500,
        name: "DefaultUser",
        email: "default@email.com",
        password: "pinkfloyd"
    };
    var defaulImage = {
        id: 2,
        name: "DefaultImage",
        url: "http://email.com/img/21",
        UserId: defaultUser.id,
    };
    beforeEach(function (done) {
        model.User
            .destroy({
            where: {}
        })
            .then(function () {
            model.User.create(defaultUser).then(function () {
                console.log("Default User created"); //tslint:disable-line
                model.Image
                    .destroy({
                    where: {}
                })
                    .then(function () {
                    model.Image.create(defaulImage).then(function () {
                        console.log("Default Image created"); //tslint:disable-line
                        done();
                    });
                });
            });
        });
    });
    describe("Método Create", function () {
        it("Deve criar um nova Image", function () {
            var newImage = {
                id: 1,
                name: "New Image",
                url: "http://pikachu.com/458",
                UserId: defaultUser.id,
            };
            return service_1.default.create(newImage).then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys([
                    "id",
                    "name",
                    "url",
                    "UserId",
                    "updatedAt",
                    "createdAt"
                ]);
            });
        });
    });
    describe("Método Update", function () {
        it("Deve atualizar uma Imagem", function () {
            var updateImage = {
                name: "Update Image",
                email: "http://updateemail.com/47"
            };
            return service_1.default.update(defaulImage.id, updateImage).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe("Método GET Images", function () {
        it("Deve retornar uma lista com todos as Imagens", function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an("array");
            });
        });
    });
    describe("Método getById", function () {
        it("Deve retornar uma Imagem de acordo com o ID informado", function () {
            return service_1.default.getById(defaulImage.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(["User", "UserId", "id", "name", "url"]);
            });
        });
    });
    describe("Método Delete", function () {
        it("Deve deletar uma Image", function () {
            return service_1.default.delete(defaulImage.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
