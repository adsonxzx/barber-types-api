import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

/**
 * Public Routers
 */
routes.use('/sessions', sessionsRouter);

/**
 * Private Routers
 */
routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
