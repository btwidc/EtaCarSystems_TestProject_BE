import { Router } from 'express';
import { body } from 'express-validator';

import EmployeeController from '../controllers/EmployeeController.js';

const employeeRouter = Router();

employeeRouter.get('/', EmployeeController.getEmployees);
employeeRouter.get('/:id', EmployeeController.getEmployee);
employeeRouter.post(
  '/',
  body('name').isString().isLength({ min: 2 }),
  body('surname').isString().isLength({ min: 4 }),
  body('position').isString().isLength({ min: 3 }),
  body('isHead').isBoolean(),
  body('departmentName').isString().isLength({ min: 2 }),
  EmployeeController.addEmployee,
);
employeeRouter.delete('/:id', EmployeeController.deleteEmployee);

export default employeeRouter;
