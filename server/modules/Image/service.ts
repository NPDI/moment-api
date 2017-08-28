import * as Bluebird from 'bluebird';

import { createImage, createImages, IImage, IImageDetail } from './interface';

const model = require('../../models');

class Image implements IImage {
  public id: number;
  public name: string;
  public url: string;

  public create(img: any) {
    return model.Image.create(img);
  }

  public getAll(): Bluebird<IImage[]> {
    return model.User.findAll({
      order: ['name'],
    })
      .then(createImages);
  }

  public update(id: number, img: any) {
    return model.Image.update(img, {
      where: { id },
      fields: ['name', 'url'],
    });
  }

  public delete(id: number) {
    return model.Image.destroy({
      where: { id },
    });
  }
}

export default new Image();
