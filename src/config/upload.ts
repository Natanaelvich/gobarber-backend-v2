import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolfer = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tmpFolfer,
  uploadsFolder: path.resolve(tmpFolfer, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpFolfer,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
