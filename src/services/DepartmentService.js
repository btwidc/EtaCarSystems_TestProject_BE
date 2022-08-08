import sequelize from '../db.js';

import Department from '../models/Department.js';
import Employee from '../models/Employee.js';

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

    return departments;
  }

  static async getDepartment(id) {
    const department = await Department.findOne({
      where: id,
      attributes: [
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
          attributes: ['name', 'surname', 'position'],
        },
      ],
    });

    return department;
  }

  static async addDepartment(name, description) {
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

    return deletedDepartment;
  }

  static async getDepartmentId(departmentName) {
    const department = await Department.findOne({
      where: { name: departmentName },
    });
    const departmentId = department.id;

    return departmentId;
  }
}

