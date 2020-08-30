import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  } catch (error) {
    return response.status(409).json({ error: error.message });
  }
});

export default usersRouter;
