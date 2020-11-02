import { Router } from 'express';
import multer from 'multer';
import { getRepository, Like } from 'typeorm';
import uploadConfig from '../config/upload';

// CUSTOM IMPORTS
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Post from '../models/Post';
import CreatePostService from '../services/posts/CreatePostService';

const postsRoutes = Router();
const upload = multer(uploadConfig);

postsRoutes.use(ensureAuthenticated);

postsRoutes.get('/', async (request, response) => {
  const { search } = request.query;

  const postsRepository = getRepository(Post);

  let posts = [];

  if (search) {
    posts = await postsRepository.find({
      description: Like(`%${search}%`),
    });
  } else {
    posts = await postsRepository.find();
  }

  return response.json(posts);
});

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
