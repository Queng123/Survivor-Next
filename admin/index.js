require('dotenv').config();
require('./database');

const express = require('express');
const index = require('./routes');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

exports.app = app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./config/session.config');
require('./config/passport.config');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(index);

app.listen(3000, () => {
  console.log('server started');
});
