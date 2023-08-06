const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/movies3';

async function initMongo() {
  return mongoose.connect(connectionString);
}

module.exports = { 
    initMongo
}