import { Router } from 'express';

import passwordForgotController from '../controllers/PasswordForgotController';
import resetUserPasswrodController from '../controllers/ResetUserPasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', passwordForgotController.create);

passwordRouter.post('/reset', resetUserPasswrodController.create);

export default passwordRouter;
