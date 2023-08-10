const Status = require('../models/Status');

async function createStatus(data) {
  return await Status.create(data);
}

module.exports = {
  createStatus,
};
