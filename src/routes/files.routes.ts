import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

// CUSTOM IMPORTS
import UploadFileService from '../services/files/UploadFileService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const filesRoutes = Router();
const upload = multer(uploadConfig);

// Patch is like PUT, but only change ONE field of table
filesRoutes.post(
  '/',
  ensureAuthenticated,
  upload.single('file'),
  async (request, response) => {
    const uploadFileService = new UploadFileService();

    const file = await uploadFileService.execute({
      fileName: request.file.filename,
    });

    return response.json(file);
  },
);

export default filesRoutes;
