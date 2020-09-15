import { Router, Request, Response } from 'express';
import multer from 'multer';
import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UserReposiory from '../../typeorm/repositories/UserReposiory';

const usersRouter = Router();

const uploader = multer(upload);

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UserReposiory();
  const createUser = new CreateUserService(usersRepository);

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
    const usersRepository = new UserReposiory();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default usersRouter;
