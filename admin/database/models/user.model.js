const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
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

const User = mongoose.model('user', userSchema);

module.exports = User;