import { IUser } from '../User/interface';

export interface IImage {
  readonly id: number;
  name: string;
  description: string;
  UserId: number;
}

export interface IImageDetail extends IImage {
  id: number;
  name: string;
  description: string;
  UserId: number;
  User: any;
}

export function createImage({ id, name, description, UserId }: any): IImage {
  return {
    id, name, description, UserId,
  };
}

export function createImages(data: any[]): IImage[] {
  return data.map(createImage);
}

export function createImageById({ id, name, description, User, UserId }: any): IImageDetail {
  return {
    id, name, description, User, UserId,
  };
}
