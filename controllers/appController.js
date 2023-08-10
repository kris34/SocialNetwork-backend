const Status = require('../models/Status');
const {createStatus, deleteStatus} = require('../services/app');

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

router.delete('/status/:id/delete', async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (status._ownerId == req.user._id) {
      await deleteStatus(req.params.id);
    } else {
      throw new Error('You cannot delete this status.');
    }

    res.status(200).json('Deleted');
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});



module.exports = router;
