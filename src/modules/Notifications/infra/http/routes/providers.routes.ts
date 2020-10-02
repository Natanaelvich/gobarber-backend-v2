import { Router } from 'express';
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
  listProviderMonthAvaillabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availibity',
  listProviderDayAvaillabilityController.index,
);
providersRouter.get('/appointments', listProviderAppointmestsService.index);

export default providersRouter;
