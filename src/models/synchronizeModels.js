import Department from './Department.js';
import Employee from './Employee.js';

const synchronizeModels = async () => {
  await Department.sync();
  await Employee.sync();
};

export default synchronizeModels;