import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';

const appointmentsRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request: Request, response: Response) => {
  const appointments = appointmentsRepository.all();

  response.json(appointments);
});

appointmentsRouter.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentsService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
