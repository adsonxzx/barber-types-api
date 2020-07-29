import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

/**
 * Private Routes
 */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentController.index);

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
