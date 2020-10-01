import ListProviderService from '@modules/Appointmensts/services/ListProviderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListProviderMonthAvaillabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProviderService);

    const appointment = await listProviders.execute({
      user_id,
    });
    return response.json(appointment);
  }
}
