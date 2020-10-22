import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

// CUSTOM IMPORTS
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePostService from '../services/posts/CreatePostService';

const postsRoutes = Router();
const upload = multer(uploadConfig);

postsRoutes.use(ensureAuthenticated);

postsRoutes.post('/', upload.single('photo'), async (request, response) => {
  const { description, link, photo } = request.body;

  const createPostService = new CreatePostService();

  const post = await createPostService.execute({
    photo,
    link,
    description,
    userId: request.user.id,
  });

  return response.json(post);
});

export default postsRoutes;
