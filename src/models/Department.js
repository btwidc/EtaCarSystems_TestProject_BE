import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

import Employee from './Employee.js';

const Department = sequelize.define(
  'department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      required: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { timestamps: false },
);

Department.hasMany(Employee);
Employee.belongsTo(Department);

export default Department;
