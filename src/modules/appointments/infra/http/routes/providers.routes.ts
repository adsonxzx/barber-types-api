import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-available',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default providersRouter;
