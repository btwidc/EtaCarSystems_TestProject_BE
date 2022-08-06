import { Router } from 'express';

const employeeRouter = Router();

employeeRouter.get('/');
employeeRouter.get('/:id');
employeeRouter.post('/');
employeeRouter.delete('/:id');

export default employeeRouter;