import { Router } from 'express';
import { body } from 'express-validator';

import DepartmentController from '../controllers/DepartmentController.js';

const departmentRouter = Router();

departmentRouter.get('/', DepartmentController.getDepartments);
departmentRouter.get('/:id', DepartmentController.getDepartment);
departmentRouter.post(
  '/',
  body('name').isString(),
  body('description').isString(),
  DepartmentController.addDepartment,
);
departmentRouter.delete('/:id', DepartmentController.deleteDepartment);

export default departmentRouter;
