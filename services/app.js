const Status = require('../models/Status');

async function createStatus(data) {
  return await Status.create(data);
}

async function deleteStatus(id) {
  return await Status.findByIdAndDelete(id);
}

module.exports = {
  createStatus,
  deleteStatus
};
