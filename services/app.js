const Status = require('../models/Status');
const Comment = require('../models/comment');

async function createStatus(data) {
  return await Status.create(data);
}

async function deleteStatus(id) {
  return await Status.findByIdAndDelete(id);
}

async function editStatus(id, text) {
  const status = await Status.findById(id);
  status.text = text;
  return await status.save();
}

async function postComment(data) {
  return await Comment.create(data);
}

async function getUserComments(userId) {
  const comments = await Comment.find({});
  const userComments = await comments.filter((c) => c._ownerId == userId);

  return userComments;
}

module.exports = {
  createStatus,
  deleteStatus,
  editStatus,
  postComment,
  getUserComments
};
