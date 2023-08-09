const { model, Types, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: [3, 'Username has to be at least 3 chararakter long!'],
    maxLength: [15, 'Username cannot be longer then 15 charakters.'],
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: [5, 'Password has to be at least 5 charakters long.'],
  },
  friends: { type: [Types.ObjectId], ref: 'User', default: [] },
  status: { type: [Types.ObjectId], ref: 'Status', default: [] },
});

userSchema.index(
  { username: 1 },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const User = new model('User', userSchema);

module.exports = User;
