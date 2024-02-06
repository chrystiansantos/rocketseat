import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Orphanages from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanages);
    const orphanages = await orphanageRepository.find({
      relations: ['images'],
    });
    return res.status(200).json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const orphanageRepository = getRepository(Orphanages);
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images'],
    });
    return res.status(200).json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanages);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      // Aqui irei validar os dados dentro do array
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      // dessa maneira ele ira retornar todos os erros
      abortEarly: false,

    });
    const orphanage = await orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);
    res.status(201).json(orphanage);
  },
};
