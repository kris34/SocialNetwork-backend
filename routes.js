const router = require('express').Router();
const userController = require('./controllers/userController');
const statusController = require('./controllers/statusController');
const appController = require('./controllers/commentController')

router.get('/', (req, res) => {
  res.json('Working pro0perly...');
});

router.use(statusController);
router.use(appController)
router.use('/user', userController);

module.exports = router;
