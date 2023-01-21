const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const postUserRegister = async (req, res, next) => {
  let isExist;
  try {
    isExist = await User.exists({
      $or: [
        {
          username: req.body.username,
        },
        { email: req.body.email },
      ],
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }

  if (isExist === null) {
    try {
      await User.create(req.body);
      res.json({ status: true });
    } catch (err) {
      res.json({ status: false, message: err.message });
    }
  } else {
    res.json({ status: false, message: "user exists already" });
  }
};

const postUserLogin = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ username: req.body.username });
  } catch (err) {}
  if (user === null) {
    res.json({ status: false, message: "There is no such user" });
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = await jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      res.json({ status: true, token, user });
    } else {
      res.json({ status: false, message: "Username or Password is incorrect" });
    }
  }
};

module.exports = {
  postUserRegister,
  postUserLogin,
};
