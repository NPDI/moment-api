import * as HTTPStatus from "http-status";
import * as jwt from "jwt-simple";

import { app, expect, request } from "./config/helpers";

const model = require("../../server/models");

describe("Testes de Integração", () => {
  "use strict";
  const config = require("../../server/config/env/config")();

  let token;

  const defaultUser = {
    id: 1,
    name: "Dulval",
    email: "diego@email.com",
    password: "123"
  };

  const defaultImage = {
    id: 100,
    name: "NiceImage.jpg",
    description: "Nice Image",
    UserId: defaultUser.id
  };

  before(done => {
    model.User
      .destroy({
        where: {}
      })
      .then(() => model.User.create(defaultUser))
      .then(user => {
        token = jwt.encode({ id: user.id }, config.secret);
        done();
      });
  });

  beforeEach(done => {
    model.Image
      .destroy({
        where: {}
      })
      .then(() => model.Image.create(defaultImage))
      .then(img => {
        done();
      });
  });

  describe("GET /api/images/all", () => {
    it("Deve retornar um Array com todas as Imagens", done => {
      request(app)
        .get("/api/images/all")
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload).to.be.an("array");
          expect(res.body.payload[0].name).to.be.equal(defaultImage.name);
          expect(res.body.payload[0].description).to.be.equal(
            defaultImage.description
          );
          done(error);
        });
    });
  });

  describe("GET /api/images/:id", () => {
    it("Deve retornar apenas uma Imagem", done => {
      request(app)
        .get(`/api/images/${defaultImage.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.equal(defaultImage.id);
          expect(res.body.payload).to.have.all.keys([
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

  describe("POST /api/images/create", () => {
    it("Deve criar uma nova Imagem", done => {
      const newImage = {
        id: 500,
        name: "NiceImage2.jpg",
        description: "New Nice Image",
        UserId: defaultUser.id
      };
      request(app)
        .post("/api/images/create")
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .send(newImage)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.eql(newImage.id);
          expect(res.body.payload.name).to.eql(newImage.name);
          expect(res.body.payload.description).to.eql(newImage.description);
          done(error);
        });
    });
  });

  describe("PUT /api/images/:id/update", () => {
    it("Deve atualizar um Imagem", done => {
      const updateImage = {
        description: "New Descripthion :)"
      };
      request(app)
        .put(`/api/images/${defaultImage.id}/update`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .send(updateImage)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(error);
        });
    });
  });

  describe("DELETE /api/images/:id/destroy", () => {
    it("Deve deletar uma Imagem", done => {
      request(app)
        .del(`/api/images/${defaultImage.id}/destroy`)
        .set("Content-Type", "application/json")
        .set("Authorization", `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload).to.eql(1);
          done(error);
        });
    });
  });
});
