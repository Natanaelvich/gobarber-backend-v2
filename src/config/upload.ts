import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfg {
  driver: 's3' | 'disk';

  config: {
    disk: {
      storage: StorageEngine;
    };
  };
}

const tmpFolfer = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  driver: process.env.STORAGE_DRIVER,

  directory: tmpFolfer,
  uploadsFolder: path.resolve(tmpFolfer, 'uploads'),

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolfer,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
  },
} as IUploadConfg;
