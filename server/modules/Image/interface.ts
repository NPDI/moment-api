import { IUser } from '../User/interface';

export interface IImage {
  readonly id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  UserId: number;
}

export interface IImageDetail extends IImage {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  UserId: number;
  User: any;
}

export function createImage({ id, name, latitude, longitude, description, UserId }: any): IImage {
  return {
    id, name, description, latitude, longitude, UserId,
  };
}

export function createImages(data: any[]): IImage[] {
  return data.map(createImage);
}

export function createImageById({ id, name, description, latitude, longitude, User, UserId }: any): IImageDetail {
  return {
    id, name, description, latitude, longitude, User, UserId,
  };
}
