const Status = require('../models/Status');

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

module.exports = {
  createStatus,
  deleteStatus,
  editStatus,
};
