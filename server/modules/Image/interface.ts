export interface IImage {
  readonly id: number;
  name: string;
  url: string;
}

export interface IImageDetail extends IImage {
  id: number;
  name: string;
  url: string;
}

export function createImage({ id, name, url }: any): IImage {
  return {
    id, name, url,
  };
}

export function createImages(data: any[]): IImage[] {
  return data.map(createImage);
}
