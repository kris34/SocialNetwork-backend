const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    res.status(200).json('Working');
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

module.exports = router;
