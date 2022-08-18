import { Router } from 'express';
import { body } from 'express-validator';

import DepartmentController from '../controllers/DepartmentController.js';

const departmentRouter = Router();

departmentRouter.get('/', DepartmentController.getDepartments);
departmentRouter.get('/:id', DepartmentController.getDepartment);
departmentRouter.post(
  '/',
  body('name').isString().isLength({ min: 2 }),
  body('description').isString().isLength({ min: 10 }),
  DepartmentController.addDepartment,
);
departmentRouter.delete('/:id', DepartmentController.deleteDepartment);

export default departmentRouter;
