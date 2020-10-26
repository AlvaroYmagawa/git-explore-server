import { Router } from 'express';

// CUSTOM IMPORTS
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import postsRoutes from './posts.routes';
import filesRoutes from './files.routes';

const routes = Router();

// Use appointmentsRouter to call all request with /appointments as
// default path
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRoutes);
routes.use('/files', filesRoutes);

export default routes;
