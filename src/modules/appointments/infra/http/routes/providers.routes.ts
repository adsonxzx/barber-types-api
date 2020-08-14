import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import providerController from '../controllers/ProviderController';
import providerMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import providerDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

/**
 * Private Routes
 */
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
  '/:provider_id/month-available',
  providerMonthAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-available',
  providerDayAvailabilityController.index,
);

export default providersRouter;
