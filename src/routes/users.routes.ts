import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

// CUSTOM IMPORTS
import UpdateUserAvararService from '../services/user/UpdateUserAvararService';
import CreateUserService from '../services/user/CreateUserService';
import ShowUserService from '../services/user/ShowUserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password, admin } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    admin,
  });

  // Deleting user password to do not show into response
  delete user.password;

  return response.json(user);
});

usersRoutes.get('/:userId', async (request, response) => {
  const { userId } = request.params;

  const showUserService = new ShowUserService();

  const user = await showUserService.execute({ userId });

  return response.json(user);
});

usersRoutes.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json(users);
});

// Patch is like PUT, but only change ONE field of table
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvararService = new UpdateUserAvararService();

    const user = await updateUserAvararService.execute({
      // request.user.id is only accessible because our auth middleware
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRoutes;
