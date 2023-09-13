const { saveJson } = require('../queries/dashboard.queries');

exports.submitForm = (req, res, next) => {
  res.render("dashboard/dashboard-form")
}

exports.submit = async (req, res, next) => {
    const body = req.body;
    try {
      const user = await saveJson(body);
      res.redirect('/dashboard');
    } catch (error) {
      next(error);
    }
}
