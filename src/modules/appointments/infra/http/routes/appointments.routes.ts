import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import listProviderDayAppointmentsControoler from '../controllers/ListProviderDayAppointmentsController';

const appointmentsRouter = Router();

/**
 * Private Routes
 */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentController.index);

appointmentsRouter.get('/day', listProviderDayAppointmentsControoler.index);

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
