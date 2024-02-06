import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'tmp'),
    filename: (req, file, cb) => {
      const filemane = `${Date.now()}-${file.originalname.trim()}`;
      cb(null, filemane);
    },
  }),
};
