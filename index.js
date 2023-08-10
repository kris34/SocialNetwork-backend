const express = require('express');
const app = express();
const {setCors} = require('./configs/cors');
const {initMongo} = require('./configs/database');
const cookieParser = require('cookie-parser');
const {authMiddleware} = require('./middleware/session');
const router = require('./routes');
const port = '3000';

start();
async function start() {
  app.use(setCors());
  await initMongo();
  app.use(cookieParser());
  app.use(express.json());
  app.use(authMiddleware());
  app.use(router);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
