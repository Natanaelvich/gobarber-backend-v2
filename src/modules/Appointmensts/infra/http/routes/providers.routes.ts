import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ListProviderDayAvaillabilityController from '../controllers/ListProviderDayAvaillabilityController';
import ListProviderMonthAvaillabilityController from '../controllers/ListProviderMonthAvaillabilityController';
import ListProvidersAppintmentsController from '../controllers/ListProvidersAppintmentsController';

const providersController = new ProvidersController();
const listProviderAppointmestsService = new ListProvidersAppintmentsController();
const listProviderMonthAvaillabilityController = new ListProviderMonthAvaillabilityController();
const listProviderDayAvaillabilityController = new ListProviderDayAvaillabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availibity',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      month: Joi.required(),
      year: Joi.required(),
    },
  }),
  listProviderMonthAvaillabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availibity',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      day: Joi.required(),
      month: Joi.required(),
      year: Joi.required(),
    },
  }),
  listProviderDayAvaillabilityController.index,
);
providersRouter.get(
  '/appointments',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.required(),
      month: Joi.required(),
      year: Joi.required(),
    },
  }),
  listProviderAppointmestsService.index,
);

export default providersRouter;
