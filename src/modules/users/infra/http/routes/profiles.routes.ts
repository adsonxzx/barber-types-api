import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import profileController from '../controllers/ProfileController';

const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);

profilesRouter.put('/', profileController.update);

export default profilesRouter;
