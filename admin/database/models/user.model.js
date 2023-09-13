const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
  teamuuid: { type: String, required: true },
  local: {
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password);
}

userSchema.methods.findTeam = function(_id) {
  return this.model('user').findOne({ _id: _id }).exec();
}

const User = mongoose.model('user', userSchema);

module.exports = User;