import ListProviderAppointmestsService from '@modules/Appointmensts/services/ListProviderAppointmestsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProvidersAppintmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, year, day } = request.query;

    const listProviders = container.resolve(ListProviderAppointmestsService);

    const appointment = await listProviders.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });
    return response.json(classToClass(appointment));
  }
}
