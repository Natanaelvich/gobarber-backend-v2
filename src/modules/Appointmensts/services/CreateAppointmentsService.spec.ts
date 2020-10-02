import FakeINotificationRepository from '@modules/Notifications/repositories/fakes/FakeINotificationRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeINotificationRepository: FakeINotificationRepository;
let createAppointment: CreateAppointmentsService;

describe('CreateApppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeINotificationRepository = new FakeINotificationRepository();
    createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
      fakeINotificationRepository,
    );
  });
  it('should be able to create a new appoitment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12).getTime();
    });

    const appoitment = await createAppointment.execute({
      user_id: '123123',
      date: new Date(2020, 4, 11, 13),
      provider_id: '456456',
    });

    expect(appoitment).toHaveProperty('id');
    expect(appoitment.provider_id).toBe('456456');
  });

  it('should not be able to create a new appoitment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12).getTime();
    });

    await createAppointment.execute({
      user_id: '123123',
      date: new Date(2020, 4, 11, 13),
      provider_id: '345345',
    });

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 13),
        provider_id: '345345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12, 0, 0).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 11, 0, 0),
        provider_id: '456456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 13),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 18pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 18),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an notification after create appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 11, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: '123123',
        date: new Date(2020, 4, 11, 18),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
