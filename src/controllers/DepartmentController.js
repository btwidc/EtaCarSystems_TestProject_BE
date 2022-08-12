import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError.js';

import DepartmentService from '../services/DepartmentService.js';

export default class DepartmentController {
  static async getDepartments(req, res, next) {
    try {
      const departments = await DepartmentService.getDepartments();

      res.json(departments);
    } catch (e) {
      next(e);
    }
  }

  static async getDepartment(req, res, next) {
    try {
      const departmentId = req.params.id;
      const department = await DepartmentService.getDepartment(departmentId);

      res.json(department);
    } catch (e) {
      next(e);
    }
  }

  static async addDepartment(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { name, description } = req.body;
      const newDepartment = await DepartmentService.addDepartment(name, description);

      res.json(newDepartment);
    } catch (e) {
      next(e);
    }
  }

  static async deleteDepartment(req, res, next) {
    try {
      const departmentId = req.params.id;
      const department = await DepartmentService.deleteDepartment(departmentId);

      res.json(department);
    } catch (e) {
      next(e);
    }
  }
}
