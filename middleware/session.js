const {verifyToken} = require('../services/user')

const authMiddleware = () => (req, res, next) => {
  const token = req.headers['x-authorization']

  if (token) {
    try {
      const payload = verifyToken(token)
      req.user = payload
      req.token = token
    } catch (err) {
      return res.status(401).json({message: 'Invalid authorization token!'})
    }
  }

  next()
}

module.exports = {authMiddleware}
