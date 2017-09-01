import { expect, testDouble } from "./config/helpers";

import Image from "../../server/modules/Image/service";
import User from "../../server/modules/User/service";

const model = require("../../server/models");

describe("Testes Unitarios do Image Service", () => {
  const defaultUser = {
    id: 500,
    name: "DefaultUser",
    email: "default@email.com",
    password: "pinkfloyd"
  };

  const defaulImage = {
    id: 2,
    name: "DefaultImage.jpg",
    description: "Nice Image",
    latitude: "38.7755940",
    longitude: "-9.1353670",
    UserId: defaultUser.id,
  };

  beforeEach(done => {
    model.User
      .destroy({
        where: {}
      })
      .then(() => {
        model.User.create(defaultUser).then(() => {
          console.log("Default User created"); //tslint:disable-line
          model.Image
            .destroy({
              where: {}
            })
            .then(() => {
              model.Image.create(defaulImage).then(() => {
                console.log("Default Image created"); //tslint:disable-line
                done();
              });
            });
        });
      });
  });

  describe("Método Create", () => {
    it("Deve criar um nova Image", () => {
      const newImage = {
        id: 1,
        name: "file_01545456.jpg",
        description: "Hello Map",
        latitude: "-22.260369",
        longitude: "-45.702633",
        UserId: defaultUser.id,
      };
      return Image.create(newImage).then(data => {
        expect(data.dataValues).to.have.all.keys([
          "id",
          "name",
          "description",
          "latitude",
          "longitude",
          "UserId",
          "updatedAt",
          "createdAt"
        ]);
      });
    });
  });

  describe("Método Update", () => {
    it("Deve atualizar uma Imagem", () => {
      const updateImage = {
        name: "Update Image",
        description: " Updated image "
      };
      return Image.update(defaulImage.id, updateImage).then(data => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Método GET Images", () => {
    it("Deve retornar uma lista com todos as Imagens", () => {
      return Image.getAll().then(data => {
        expect(data).to.be.an("array");
      });
    });
  });

  describe("Método getById", () => {
    it("Deve retornar uma Imagem de acordo com o ID informado", () => {
      return Image.getById(defaulImage.id).then(data => {
        expect(data).to.have.all.keys(["User", "UserId", "id", "name", "description", "latitude", "longitude"]);
      });
    });
  });

  describe("Método Delete", () => {
    it("Deve deletar uma Image", () => {
      return Image.delete(defaulImage.id).then(data => {
        expect(data).to.be.equal(1);
      });
    });
  });
});
