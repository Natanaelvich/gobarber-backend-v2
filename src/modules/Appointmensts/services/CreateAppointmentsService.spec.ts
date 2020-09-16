import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

describe('CreateApppointment', () => {
  it('should be able to create a new appoitment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appoitment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appoitment).toHaveProperty('id');
    expect(appoitment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appoitment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appoitmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appoitmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appoitmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
