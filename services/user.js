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

async function sendFriendRequest(userId, friendId) {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  friend.friendRequests.push(user._id);

  return await friend.save();
}

async function acceptFriendRequest(userId, friendId) {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  friend.friends.push(userId);
  await friend.save();
  user.friends.push(friendId);
  user.friendRequests = user.friendRequests.filter((id) => id != friendId);
  return user.save();
}

async function removeFriend(userId, friendId) {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  user.friends = user.friends.filter((id) => id != friendId);
  await user.save();
  friend.friends = friend.friends.filter((id) => id != userId);
  return await friend.save();
}

module.exports = {
  verifyToken,
  register,
  login,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
};
