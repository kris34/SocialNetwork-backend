const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'p-2-309r8wioeaf';
const bcrypt = require('bcrypt');

function createToken(data) {
  const payload = {
    _id: data._id,
    email: data.email,
  };

  accessToken = jwt.sign(payload, JWT_SECRET);

  return {
    _id: payload._id,
    emai: payload.email,
    accessToken: accessToken,
  };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function register(data) {
  const existingEmail = await User.findOne({email: data.email});
  const existingUsername = await User.findOne({username: data.username});

  if (existingEmail) {
    throw new Error('Email is taken.');
  } else if (existingUsername) {
    throw new Error('Username is taken.');
  }

  const token = {
    username: data.username,
    email: data.email,
    hashedPassword: await bcrypt.hash(data.password, 10),
  };

  const user = await User.create(token);

  return createToken(user);
}

async function login(email, password) {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error('Invalid user.');
  }

  if (await bcrypt.compare(password, user.hashedPassword)) {
    return createToken(user);
  } else {
    throw new Error('Invalid username or password!');
  }
}

module.exports = {
  verifyToken,
  register,
  login,
};
