const createModel = require('../database/models/dashboard.model');

exports.getJson = (uuid) => {
    const Dashboard = createModel(uuid);
    return Dashboard.findOne({ _id: uuid }).select('-logo').select('-_timestamp').select('-_id').select('-__v').exec();
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
exports.getLogo = async (uuid) => {
    const Dashboard = createModel(uuid);
    const test = await Dashboard.findOne({ _id: uuid }, { logo: 1 }).exec();
    if (test) {
        return Buffer.from(test.logo.logoData.split(",")[1], 'base64');
    }
    return null;
};

exports.getAll = async (uuid) => {
    const Dashboard = createModel(uuid);
    const test = await Dashboard.findOne({ _id: uuid }).exec();
    if (test) {
        return test;
    }
    return null;
}
