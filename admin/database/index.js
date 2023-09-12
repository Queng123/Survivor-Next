const mongoose = require('mongoose');

const password = process.env['PASSWORD_DB'];
const userName = process.env['USER_DB'];

exports.clientPromise = mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.3cbrbsx.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => {
  console.log('connection with data base: DONE');
}).catch( err => {
  console.log(err);
})
