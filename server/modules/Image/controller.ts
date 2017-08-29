import { Request, Response } from "express";
import * as HTTPStatus from "http-status";
import * as _ from "lodash";

import * as fs from 'fs';

import * as multer from "multer";

const config = require("../../config/env/config")();
import Handlers from "../../api/responses/handlers";
import Image from "./service";

class ImageController {
  public dir = config.uploadPath;
  public storage;
  public upload;

  constructor() {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
    this.storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, this.dir);
      },
      filename: (req, file, callback) => {
        const fileExtension = file.originalname.split(".").pop();
        callback(null, "file_" + Date.now() + "." + fileExtension);
      }
    });

    this.upload = multer({ storage: this.storage }).single("myfile");
  }

  public getAll(req: Request, res: Response) {
    Image.getAll()
      .then(_.partial(Handlers.onSucess, res))
      .catch(
        _.partial(Handlers.onError, res, "Erro ao buscar todos os imagem")
      );
  }

  public createImage(req: Request, res: Response) {
    Image.create(req.body)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao inserir novo imagem"));
  }

  public getById(req: Request, res: Response) {
    const ImageId = parseInt(req.params.id, 10);
    Image.getById(ImageId)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Imagem não encontrado"));
  }

  public updateImage(req: Request, res: Response) {
    const ImageId = parseInt(req.params.id, 10);
    const props = req.body;
    Image.update(ImageId, props)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao atualizar imagem"));
  }

  public deleteImage(req: Request, res: Response) {
    const imageId = parseInt(req.params.id, 10);
    Image.delete(imageId)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao excluir imagem"));
  }

  public uploadImage(req: Request, res: Response) {
    this.upload(req, res, (err) => {
      if (err) {
        return Handlers.onError(res, "Upload failed", err);
      } else {
        return Handlers.onSucess(res, req.file);
      }
    });
  }
}

export default new ImageController();
