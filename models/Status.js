const {Schema, Types, model} = require('mongoose');

const statusSchema = new Schema({
  text: {type: String},
  likes: {type: [Types.ObjectId], ref: 'User', required: true},
  _ownerId: {type: Types.ObjectId, ref: 'User', required: true},
});

const Status = new model('Status', statusSchema);

module.exports = Status;
