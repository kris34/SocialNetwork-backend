const {register, login} = require('../services/user');

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
    res.status(400).json({error: err.message});
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});



module.exports = router;
