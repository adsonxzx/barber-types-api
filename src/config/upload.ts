import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const folderDestination = resolve(__dirname, '..', '..', 'temp');

export default {
  folderDestination,
  storage: multer.diskStorage({
    destination: folderDestination,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
