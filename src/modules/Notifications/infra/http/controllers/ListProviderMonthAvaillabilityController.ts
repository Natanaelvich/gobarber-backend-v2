import ListProviderMonthAvaillabilityService from '@modules/Appointmensts/services/ListProviderMonthAvaillabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderMonthAvaillabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProvidersMonthAvalibility = container.resolve(
      ListProviderMonthAvaillabilityService,
    );

    const appointment = await listProvidersMonthAvalibility.execute({
      month,
      provider_id,
      year,
    });
    return response.json(appointment);
  }
}
