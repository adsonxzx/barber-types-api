import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import passwordForgotController from '../controllers/PasswordForgotController';
import resetUserPasswrodController from '../controllers/ResetUserPasswordController';

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordForgotController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      newPassword: Joi.string().required(),
    },
  }),
  resetUserPasswrodController.create,
);

export default passwordRouter;
