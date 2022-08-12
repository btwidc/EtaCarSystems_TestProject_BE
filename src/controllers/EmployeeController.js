import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError.js';

import EmployeeService from '../services/EmployeeService.js';

export default class EmployeeController {
  static async getEmployees(req, res, next) {
    try {
      const employees = await EmployeeService.getEmployees();

      res.json(employees);
    } catch (e) {
      next(e);
    }
  }

  static async getEmployee(req, res, next) {
    try {
      const employeeId = req.params.id;
      const employee = await EmployeeService.getEmployee(employeeId);

      res.json(employee);
    } catch (e) {
      next(e);
    }
  }

  static async addEmployee(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { name, surname, position, isHead, departmentName } = req.body;
      const newEmployee = await EmployeeService.addEmployee(
        name,
        surname,
        position,
        isHead,
        departmentName,
      );

      res.json(newEmployee);
    } catch (e) {
      next(e);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const employeeId = req.params.id;
      const employee = await EmployeeService.deleteEmployee(employeeId);

      res.json(employee);
    } catch (e) {
      next(e);
    }
  }
}
