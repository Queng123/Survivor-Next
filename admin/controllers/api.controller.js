const { getJson, getTimestamp, getLogo, getAll } = require('../queries/api.queries');

exports.custom = async (req, res, next) => {
    try {
      const json = await getJson(req.params.uuid);
      res.setHeader('Content-Type', 'application/json');
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

exports.logo = async (req, res, next) => {
    try {
        const logo = await getLogo(req.params.uuid);
        res.setHeader('Content-Type', 'image/png');
        res.send(logo);
    } catch (error) {
      next(error);
    }
}

exports.all = async (req, res, next) => {
    try {
        const json = await getAll(req.params.uuid);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    } catch (error) {
      next(error);
    }
}