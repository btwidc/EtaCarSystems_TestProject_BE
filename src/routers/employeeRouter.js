import { Router } from 'express';
import { body } from 'express-validator';

import EmployeeController from '../controllers/EmployeeController.js';

const employeeRouter = Router();

employeeRouter.get('/', EmployeeController.getEmployees);
employeeRouter.get('/:id', EmployeeController.getEmployee);
employeeRouter.post(
  '/',
  body('name').isString(),
  body('surname').isString(),
  body('position').isString(),
  body('isHead').isBoolean(),
  body('departmentName').isString(),
  EmployeeController.addEmployee,
);
employeeRouter.delete('/:id', EmployeeController.deleteEmployee);

export default employeeRouter;
