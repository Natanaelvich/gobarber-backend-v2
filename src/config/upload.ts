import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfg {
  driver: 's3' | 'disk';

  tmpFolfer: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolfer = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolfer,
  uploadsFolder: path.resolve(tmpFolfer, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolfer,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'mundotech',
    },
  },
} as IUploadConfg;
