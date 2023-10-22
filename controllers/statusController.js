const {hasUser} = require('../middleware/hasUser');
const Status = require('../models/Status');
const {
  createStatus,
  deleteStatus,
  editStatus,
  likeStatus,
  unlikeStatus,
} = require('../services/app');

const router = require('express').Router();

router.post('/status/create', hasUser(), async (req, res) => {
  try {
    const data = Object.assign({_ownerId: req.user._id}, req.body);
    const status = await createStatus(data);
    res.status(200).json(status);
  } catch (err) {
    req.statusCode(400).json({error: err.message});
  }
});

router.delete('/status/:id/delete', hasUser(), async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (status._ownerId != req.user._id) {
      throw new Error('You cannot delete this status!');
    }

    await deleteStatus(req.params.id);

    res.status(200).json('Deleted');
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

router.put('/status/:id/edit', hasUser(), async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);

    if (status._ownerId != req.user._id) {
      throw new Error('You cannot edit this status!');
    }

    const editedStatus = await editStatus(req.params.id, req.body.text);
    res.status(200).json(editedStatus);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/status/:id/like', async (req, res) => {
  try {
    const liked = await likeStatus(req.user._id, req.params.id);
    console.log('liked');
    res.status(200).json(liked);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/status/:id/dislike', async (req, res) => {
  try {
    const liked = await unlikeStatus(req.user._id, req.params.id);
    console.log("disliked");
    res.status(200).json(liked);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
