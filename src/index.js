import 'dotenv/config';

import http from 'http';
import express from 'express';

import sequelize from './db.js';
import synchronizeModels from './models/synchronizeModels.js';

import router from './routers/index.js';

import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(express.json());

app.use('/api', router);
app.use(errorHandlingMiddleware);

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
