const createModel = require('../database/models/dashboard.model');

exports.getJson = (uuid) => {
    const Dashboard = createModel(uuid);
    return Dashboard.findOne({ _id: uuid }).exec();
  }

exports.getTimestamp = (uuid) => {
    const Dashboard = createModel(uuid);
    return Dashboard.findOne({ _id: uuid }, { _timestamp: 1 })
    .exec()
    .then((document) => {
        if (document) {
          return document._timestamp;
        } else {
          return null;
        }
      });
  }