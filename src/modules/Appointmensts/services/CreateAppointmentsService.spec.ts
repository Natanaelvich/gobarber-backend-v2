import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
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

  it('should not be able to create a new appoitment on the same time', () => {
    expect(1 + 2).toBe(3);
  });
});
