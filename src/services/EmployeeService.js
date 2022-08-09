import sequelize from '../db.js';

import Employee from '../models/Employee.js';
import Department from '../models/Department.js';

import ApiError from '../errors/ApiError.js';
import DepartmentService from './DepartmentService.js';

export default class EmployeeService {
  static async getEmployees() {
    const employees = await Employee.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'position',
        'company',
        [
          sequelize.fn(
            'TO_CHAR',
            sequelize.col('addition_date'),
            'MON-DD-YYYY HH12:MIPM',
          ),
          'addition_date',
        ],
      ],
      order: [['addition_date', 'DESC']],
    });

    if (!employees) {
      throw ApiError.NotFound();
    }

    return employees;
  }

  static async getEmployee(id) {
    const employee = await Employee.findOne({
      where: { id },
      attributes: ['name', 'surname', 'position', 'company'],
      include: [
        {
          model: Department,
          attributes: ['name'],
        },
      ],
    });

    if (!employee) {
      throw ApiError.NotFound();
    }

    return employee;
  }

  static async addEmployee(name, surname, position, isHead, departmentName) {
    const departmentId = await DepartmentService.getDepartmentId(
      departmentName,
    );

    if (isHead === true) {
      const employee = await Employee.findOne({
        where: {
          is_head: true,
          department_id: departmentId,
        },
      });

      if (employee) {
        throw ApiError.AlreadyExists();
      }
    }

    const newEmployee = await Employee.create({
      name,
      surname,
      position,
      is_head: isHead,
      department_id: departmentId,
    });

    return newEmployee;
  }

  static async deleteEmployee(id) {
    const deletedEmployee = await Employee.destroy({
      where: { id },
    });

    if (!deletedEmployee) {
      throw ApiError.NotFound();
    }

    return deletedEmployee;
  }
}
