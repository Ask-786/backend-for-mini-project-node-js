const User = require("../../model/User");

const getHome = (req, res, next) => {
  res.json({ status: true });
};

const getProfile = async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  res.json({ user, status: true });
};

module.exports = { getHome, getProfile };
