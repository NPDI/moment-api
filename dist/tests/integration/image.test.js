"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
var helpers_1 = require("./config/helpers");
var model = require("../../server/models");
describe("Testes de Integração", function () {
    "use strict";
    var config = require("../../server/config/env/config")();
    var token;
    var defaultUser = {
        id: 1,
        name: "Dulval",
        email: "diego@email.com",
        password: "123"
    };
    var defaultImage = {
        id: 100,
        name: "NiceImage.jpg",
        description: "Nice Image",
        UserId: defaultUser.id
    };
    before(function (done) {
        model.User
            .destroy({
            where: {}
        })
            .then(function () { return model.User.create(defaultUser); })
            .then(function (user) {
            token = jwt.encode({ id: user.id }, config.secret);
            done();
        });
    });
    beforeEach(function (done) {
        model.Image
            .destroy({
            where: {}
        })
            .then(function () { return model.Image.create(defaultImage); })
            .then(function (img) {
            done();
        });
    });
    describe("GET /api/images/all", function () {
        it("Deve retornar um Array com todas as Imagens", function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/images/all")
                .set("Content-Type", "application/json")
                .set("Authorization", "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an("array");
                helpers_1.expect(res.body.payload[0].name).to.be.equal(defaultImage.name);
                helpers_1.expect(res.body.payload[0].description).to.be.equal(defaultImage.description);
                done(error);
            });
        });
    });
    describe("GET /api/images/:id", function () {
        it("Deve retornar apenas uma Imagem", function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/images/" + defaultImage.id)
                .set("Content-Type", "application/json")
                .set("Authorization", "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(defaultImage.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    "id",
                    "name",
                    "description",
                    "UserId",
                    "User"
                ]);
                done(error);
            });
        });
    });
    describe("POST /api/images/create", function () {
        it("Deve criar uma nova Imagem", function (done) {
            var newImage = {
                id: 500,
                name: "NiceImage2.jpg",
                description: "New Nice Image",
                UserId: defaultUser.id
            };
            helpers_1.request(helpers_1.app)
                .post("/api/images/create")
                .set("Content-Type", "application/json")
                .set("Authorization", "JWT " + token)
                .send(newImage)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.eql(newImage.id);
                helpers_1.expect(res.body.payload.name).to.eql(newImage.name);
                helpers_1.expect(res.body.payload.description).to.eql(newImage.description);
                done(error);
            });
        });
    });
    describe("PUT /api/images/:id/update", function () {
        it("Deve atualizar um Imagem", function (done) {
            var updateImage = {
                description: "New Descripthion :)"
            };
            helpers_1.request(helpers_1.app)
                .put("/api/images/" + defaultImage.id + "/update")
                .set("Content-Type", "application/json")
                .set("Authorization", "JWT " + token)
                .send(updateImage)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.eql(1);
                done(error);
            });
        });
    });
    describe("DELETE /api/images/:id/destroy", function () {
        it("Deve deletar uma Imagem", function (done) {
            helpers_1.request(helpers_1.app)
                .del("/api/images/" + defaultImage.id + "/destroy")
                .set("Content-Type", "application/json")
                .set("Authorization", "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.eql(1);
                done(error);
            });
        });
    });
    describe("POST /upload", function () {
        it('Deve adicionar um arquivo na pasta', function (done) {
            helpers_1.request(helpers_1.app)
                .post("/upload")
                .set("Content-Type", "multipart/form-data")
                .attach('myfile', './tests/resources/cat.png')
                .set("Authorization", "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
});
