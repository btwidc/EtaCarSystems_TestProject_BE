import { Router } from 'express';

import departmentRouter from './departmentRouter.js';
import employeeRouter from './employeeRouter.js';

const router = Router();

router.use('/department', departmentRouter);
router.use('/employee', employeeRouter);

export default router;