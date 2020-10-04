import ListProviderMonthAvaillabilityService from '@modules/Appointmensts/services/ListProviderMonthAvaillabilityService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderMonthAvaillabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProvidersMonthAvalibility = container.resolve(
      ListProviderMonthAvaillabilityService,
    );

    const appointment = await listProvidersMonthAvalibility.execute({
      month: Number(month),
      year: Number(year),
      provider_id,
    });
    return response.json(appointment);
  }
}
