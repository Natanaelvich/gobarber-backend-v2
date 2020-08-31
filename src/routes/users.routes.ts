import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import upload from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const uploader = multer(upload);

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploader.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default usersRouter;
