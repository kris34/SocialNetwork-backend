const router = require('express').Router();
const userController = require('./controllers/userController');
const siteController = require('./controllers/siteController');

router.get('/', (req, res) => {
  res.json('Working pro0perly...');
});

//router.use('/site', siteController);
router.use('/user', userController);

module.exports = router;
