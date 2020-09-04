import { Router } from 'express';

import { Segments, celebrate, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import profileController from '../controllers/ProfileController';

const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);

profilesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      old_password: Joi.string(),
    },
  }),
  profileController.update,
);

export default profilesRouter;
