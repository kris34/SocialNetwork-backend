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

async function likeStatus(userId, statusId) {
  const status = await Status.findById(statusId);

  status.likes.push(userId);
  status.color = 'pink';
  status.likesCount = status.likes.length;
  // status.isLiked = true;
  await status.save();
  return status;
}

async function unlikeStatus(userId, statusId) {
  const status = await Status.findById(statusId);

  status.likes = status.likes.filter((id) => id != userId);
  status.color = 'white';

  status.likesCount = status.likes.length;
  //status.isLiked = false;
  await status.save();

  return status;
}

module.exports = {
  createStatus,
  deleteStatus,
  editStatus,
  unlikeStatus,
  postComment,
  getUserComments,
  likeStatus,
};
