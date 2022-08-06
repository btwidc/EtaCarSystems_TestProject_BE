import 'dotenv/config';

import http from 'http';
import express from 'express';

import sequelize from './db.js';
import synchronizeModels from './models/synchronizeModels.js';

import router from './routers/index.js';

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

app.use('/api', router);
const start = async () => {
  try {
    await sequelize.authenticate();
    await synchronizeModels();
    await server.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();