const User = require('../database/models/user.model');

exports.findUserByEmail = (email) => {
  return User.findOne({ 'local.email': email }).exec();
}

exports.findUserById = (id) => {
  return User.findById(id).exec();
}

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      teamuuid: user.username,
      local: {
        password: hashedPassword,
        email: user.email,
      }
    });
    return newUser.save();
  } catch (error) {
    throw(error);
  }
}