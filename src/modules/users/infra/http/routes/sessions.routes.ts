import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
