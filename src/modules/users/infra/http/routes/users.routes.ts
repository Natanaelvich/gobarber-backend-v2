import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import User from '../../typeorm/entities/User';

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
