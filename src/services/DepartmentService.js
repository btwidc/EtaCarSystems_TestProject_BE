import sequelize from '../db.js';

import Department from '../models/Department.js';
import Employee from '../models/Employee.js';

import ApiError from '../errors/ApiError.js';

export default class DepartmentService {
  static async getDepartments() {
    const departments = await Department.findAll({
      attributes: [
        'id',
        'name',
        'description',
        [
          sequelize.fn(
            'TO_CHAR',
            sequelize.col('department.creation_date'),
            'MON-DD-YYYY HH12:MIPM',
          ),
          'creation_date',
        ],
        [
          sequelize.fn('COUNT', sequelize.col('employees.surname')),
          'number_of_employees',
        ],
        [
          sequelize.literal(`             
                (SELECT CONCAT (employees.name, ' ', employees.surname)
                  FROM employees
                    WHERE is_head=true AND employees.department_id = department.id)           
            `),
          'department_head',
        ],
        [
          sequelize.literal(`             
                (SELECT employees.id
                  FROM employees
                    WHERE is_head=true AND employees.department_id = department.id)           
            `),
          'department_head_id',
        ],
      ],
      include: [
        {
          model: Employee,
          attributes: [],
        },
      ],
      group: ['department.name', 'department.description', 'department.id'],
      order: [
        [sequelize.fn('COUNT', sequelize.col('employees.surname')), 'DESC'],
      ],
    });

    if (!departments) {
      throw ApiError.NotFound();
    }

    return departments;
  }

  static async getDepartment(id) {
    const department = await Department.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'description',
        [
          sequelize.fn(
            'TO_CHAR',
            sequelize.col('department.creation_date'),
            'MON-DD-YYYY HH12:MIPM',
          ),
          'creation_date',
        ],
      ],
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'surname', 'position'],
        },
      ],
    });

    if (!department) {
      throw ApiError.NotFound();
    }

    return department;
  }

  static async addDepartment(name, description) {
    const department = await Department.findOne({
      where: { name },
    });

    if (department) {
      throw ApiError.AlreadyExists();
    }

    const newDepartment = await Department.create({
      name,
      description,
    });

    return newDepartment;
  }

  static async deleteDepartment(id) {
    const deletedDepartment = await Department.destroy({
      where: { id },
    });

    if (!deletedDepartment) {
      throw ApiError.NotFound();
    }

    return deletedDepartment;
  }

  static async getDepartmentId(departmentName) {
    const department = await Department.findOne({
      where: { name: departmentName },
    });

    if (!department) {
      throw ApiError.NotFound();
    }

    const departmentId = department.id;

    return departmentId;
  }
}
