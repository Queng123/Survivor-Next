const { getJson } = require('../queries/api.queries');

exports.custom = async (req, res, next) => {
    try {
      const json = await getJson(req.params.uuid);
      res.send(json);
    } catch (error) {
      next(error);
    }
}