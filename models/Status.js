const { Schema, Types, Model } = require('mongoose');

const statusSchema = new Schema({
  text: { type: String },
});

const Status = new Model('Status', statusSchema);

module.exports = Status
