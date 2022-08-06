import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Employee = sequelize.define(
  'employee',
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
      allowNull: false,
      required: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      defaultValue: 'EtaCar Systems',
    },
    isHead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true,
      defaultValue: false,
    },
    addition_date: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { timestamps: false },
);

export default Employee;
