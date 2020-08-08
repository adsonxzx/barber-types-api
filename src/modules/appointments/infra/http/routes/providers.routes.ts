import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import providerController from '../controllers/ProviderController';

const providersRouter = Router();

/**
 * Private Routes
 */
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

export default providersRouter;
