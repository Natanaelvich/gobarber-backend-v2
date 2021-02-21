import CreateAppointmentsService from '@modules/Appointmensts/services/CreateAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    console.log('appointmentDate - CreateAppointmentsService');
    console.log(date);

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      provider_id,
      date,
      user_id,
    });
    return response.json(appointment);
  }
}
