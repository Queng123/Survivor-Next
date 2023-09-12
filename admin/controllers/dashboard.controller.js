const { saveJson, saveLogo } = require('../queries/dashboard.queries');

exports.submit = async (req, res, next) => {
    const body = req.body;
    try {
      const user = await saveJson(body);
      res.redirect('/dashboard');
    } catch (error) {
      next(error);
    }
}
