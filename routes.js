const router = require('express').Router();
const userController = require('./controllers/userController');
const appController = require('./controllers/appController');

router.get('/', (req, res) => {
  res.json('Working pro0perly...');
});

router.use('/app', appController);
router.use('/user', userController);

module.exports = router;
