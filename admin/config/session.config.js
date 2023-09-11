const { app } = require('../index');
const session = require('express-session');
var MongoStore = require('connect-mongodb-session')(session);

const password = process.env['PASSWORD_DB'];
const userName = process.env['USER_DB'];

app.use(session({
  secret: 'je suis un secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  store: new MongoStore({
    uri: `mongodb+srv://${userName}:${password}@cluster0.3cbrbsx.mongodb.net/`,
    collection: 'sessions',
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
}));

