const {hasUser} = require('../middleware/hasUser');
const {getUserComments} = require('../services/app');
const JWT_SECRET = 'p-2-309r8wioeaf';
const jwt = require('jsonwebtoken');

const {
  register,
  login,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  getUser,
} = require('../services/user');
const User = require('../models/User');
const Status = require('../models/Status');

const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match!");
    }

    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    
    const user = await register(data);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json([err.message]);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);
    const findUser = await User.findById(user._id);
    const token = {
      _id: user._id,
      username: findUser.username,
      email: findUser.email,
      accessToken: user.accessToken,
    };
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json([err.message]);
  }
});

router.get('/get', async (req, res) => {
  try {
    const token = req.user;

    const findUser = await User.findById(token._id);
    const user = {
      _id: token._id,
      username: findUser.username,
      email: token.email,
      accessToken: req.token,
    };
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json([err.message]);
  }
});

router.post('/:id/sendFriendRequest', hasUser(), async (req, res) => {
  try {
    const requestSent = await sendFriendRequest(req.user._id, req.params.id);
    res.status(200).json(requestSent);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/:id/acceptFriendRequest', hasUser(), async (req, res) => {
  try {
    const accepted = await acceptFriendRequest(req.user._id, req.params.id);
    res.status(200).json(accepted);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/:id/removeFriend', hasUser(), async (req, res) => {
  try {
    const removed = await removeFriend(req.user._id, req.params.id);
    res.status(200).json(removed);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await getUserComments(req.params.id);

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.get('/feed', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allStatus = await Status.find({});
    const statuses = [];

    for (let status of allStatus) {
      for (let friend of user.friends) {
        if (status._ownerId.toString() == friend._id.toString()) {
          const user = await User.findById(status._ownerId);
          let newStatus = {
            username: user.username,
            _id: status._id,
            likes: status.likes,
            color: status.color,
            text: status.text,
            likesCount: status.likesCount,
          };
          statuses.push(newStatus);
        }
      }
    }

    const result = {
      feed: statuses,
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json([err.message]);
  }
});

module.exports = router;
