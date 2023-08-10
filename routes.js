const router = require('express').Router();
const userController = require('./controllers/userController');
const statusController = require('./controllers/statusController');

router.get('/', (req, res) => {
  res.json('Working pro0perly...');
});

router.use(statusController);
router.use('/user', userController);

module.exports = router;
