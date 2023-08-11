const {hasUser} = require('../middleware/hasUser');
const Status = require('../models/Status');

const router = require('express').Router();

router.post('/:id/status/comment', hasUser(), async (req, res) => {
  try {
    const data = Object.assign(
      req.body,
      {
        _ownerId: req.user._id,
      },
      {
        _docModel: 'Status',
      },
      {
        docId: req.params.id,
      }
    );

    const comment = await postComment(data);

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
