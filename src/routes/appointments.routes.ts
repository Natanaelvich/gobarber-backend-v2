import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  response.json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
