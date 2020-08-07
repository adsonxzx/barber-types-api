import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

export default {
  tempFolder,
  uploadsFolder: resolve(tempFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
