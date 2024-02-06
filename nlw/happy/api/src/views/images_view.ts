import Image from '../models/Image';

interface IImage {
  id: number;
  url: string;
}

export default {
  render(image: Image): IImage {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },
  renderMany(images: Image[]): IImage[] {
    return images.map(image => this.render(image));
  },
};
