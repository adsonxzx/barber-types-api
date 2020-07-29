import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.create);

export default sessionsRouter;
