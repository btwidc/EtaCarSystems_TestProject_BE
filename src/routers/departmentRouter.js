import { Router } from 'express';

const departmentRouter = Router();

departmentRouter.get('/');
departmentRouter.get('/:id');
departmentRouter.post('/');
departmentRouter.delete('/:id');

export default departmentRouter;