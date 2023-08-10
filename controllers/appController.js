const {createStatus} = require('../services/app');

const router = require('express').Router();

router.post('/status/create', async (req, res) => {
  try {
    const data = Object.assign({_ownerId: req.user._id}, req.body);
    const status = await createStatus(data);
    res.status(200).json(status);
  } catch (err) {
    req.statusCode(400).json({error: err.message});
  }
});



module.exports = router;
