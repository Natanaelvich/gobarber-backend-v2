import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/Appointmensts/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsService from '@modules/Appointmensts/services/CreateAppointmentsService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();
//   response.json(appointments);
// });

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentsService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
