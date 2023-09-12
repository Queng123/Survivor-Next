const { getJson, getTimestamp } = require('../queries/api.queries');

exports.custom = async (req, res, next) => {
    try {
      const json = await getJson(req.params.uuid);
      res.send(json);
    } catch (error) {
      next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
      const timestamp = await getTimestamp(req.params.uuid);
      res.send(timestamp);
    } catch (error) {
      next(error);
    }
}