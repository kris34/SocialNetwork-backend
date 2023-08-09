const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = '2034897yrWZDL'
const bcrypt = require('bcrypt')

function createToken(data) {
  const payload = {
    _id: data._id,
    email: data.email,
  }

  accessToken = jwt.sign('token', payload)

  return {
    _id: payload._id,
    emai: payload.email,
    accessToken: accessToken,
  }
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

async function register(data) {
  const existingEmail = await User.findOne({email: data.emai})
  const existingUsername = await User.findOne({username: data.username})

  if (existingEmail) {
    throw new Error('Email is taken.')
  } else if (existingUsername) {
    throw new Error('Username is taken.')
  }

  const user = await User.create()
  return createToken(user)
}

async function login(email, password) {
  const user = await User.findOne({email: data.emai})

  if (!user) {
    throw new Error('Invalid user.')
  }

  if (await bcrypt.compare(password, user.password)) {
    return createToken(email, password)
  } else {
    throw new Error('Invalid username or password!')
  }
}

async function register() {}

module.exports = {
  verifyToken,
  register,
  login,
  
}
