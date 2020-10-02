import ListProviderAppointmestsService from '@modules/Appointmensts/services/ListProviderAppointmestsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProvidersAppintmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, year, day } = request.body;

    const listProviders = container.resolve(ListProviderAppointmestsService);

    const appointment = await listProviders.execute({
      day,
      month,
      provider_id,
      year,
    });
    return response.json(appointment);
  }
}
