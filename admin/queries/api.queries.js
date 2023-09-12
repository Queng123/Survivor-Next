const createModel = require('../database/models/dashboard.model');

exports.getJson = (uuid) => {
    const Dashboard = createModel(uuid);
    return Dashboard.findOne({ _id: uuid }).exec();
  }