const express = require('express');
const app = express();
const mongoDb = require('mongoose');
const { setCors } = require('./configs/cors');
const { initMongo } = require('./configs/database');

start();
async function start() {
  app.use(setCors());
  app.use(initMongo());
}
