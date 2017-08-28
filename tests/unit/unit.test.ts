import { expect, testDouble } from "./config/helpers";

import Image from "../../server/modules/Image/service";
import User from "../../server/modules/User/service";

const model = require("../../server/models");

describe("Testes Unitarios do User Service", () => {
  const defaultUser = {
    id: 500,
    name: "DefaultUser",
    email: "default@email.com",
    password: "pinkfloyd"
  };

  beforeEach(done => {
    model.User
      .destroy({
        where: {}
      })
      .then(() => {
        model.User.create(defaultUser).then(() => {
          console.log("Default User created"); //tslint:disable-line
          done();
        });
      });
  });

  describe("Método Create", () => {
    it("Deve criar um novo Usúario", () => {
      const newUser = {
        id: 2,
        name: "New User",
        email: "newuser@email.com",
        password: "floyd"
      };
      return User.create(newUser).then(data => {
        expect(data.dataValues).to.have.all.keys([
          "email",
          "id",
          "name",
          "password",
          "updatedAt",
          "createdAt"
        ]);
      });
    });
  });

  describe("Método Update", () => {
    it("Deve atualizar um Usúario", () => {
      const updateUser = {
        name: "UpdateUser",
        email: "updateuser@email.com"
      };
      return User.update(defaultUser.id, updateUser).then(data => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Método GET Users", () => {
    it("Deve retornar uma lista com todos os Usúario", () => {
      return User.getAll().then(data => {
        expect(data).to.be.an("array");
      });
    });
  });

  describe("Método getById", () => {
    it("Deve retornar um Usúario de acordo com o ID informado", () => {
      return User.getById(defaultUser.id).then(data => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método getByEmail", () => {
    it("Deve retornar um Usúario de acordo com o email informado", () => {
      return User.getByEmail(defaultUser.email).then(data => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método Delete", () => {
    it("Deve deletar um Usúario", () => {
      return User.delete(defaultUser.id).then(data => {
        expect(data).to.be.equal(1);
      });
    });
  });
});

describe("Testes Unitarios do Image Service", () => {
  const defaulImage = {
    id: 500,
    name: "DefaultImage",
    url: "http://email.com/img/21",
    UserId: 500,
  };

  beforeEach(done => {
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

  describe("Método Create", () => {
    it("Deve criar um nova Image", () => {
      const newImage = {
        id: 2,
        name: "New Image",
        url: "http://pikachu.com/458",
      };
      return Image.create(newImage).then(data => {
        expect(data.dataValues).to.have.all.keys([
          "id",
          "name",
          "url",
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
        email: "http://updateemail.com/47"
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

  describe("Método Delete", () => {
    it("Deve deletar uma Image", () => {
      return Image.delete(defaulImage.id).then(data => {
        expect(data).to.be.equal(1);
      });
    });
  });
});
