import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const start = async () => {
  try {
    await server.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();