const jwt = require('jsonwebtoken');

async function createToken(data) {
  const payload = {
    _id: data._id,
    email: data.email,
  };

  accessToken = jwt.sign('token', payload);

  return {
    _id: payload._id,
    emai: payload.email,
    accessToken: accessToken,
  };
}

async function register() {}
