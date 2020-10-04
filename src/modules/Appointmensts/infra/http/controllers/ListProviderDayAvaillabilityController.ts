import ListProviderDayAvaillabilityService from '@modules/Appointmensts/services/ListProviderDayAvaillabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderDayAvaillabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProvidersDayAvallabity = container.resolve(
      ListProviderDayAvaillabilityService,
    );

    const appointment = await listProvidersDayAvallabity.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });
    return response.json(appointment);
  }
}
