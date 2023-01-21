const router = require("express").Router();

const {
  postUserRegister,
  postUserLogin,
} = require("../../controllers/user-controllers/user-auth-controller");

router.route("/signup").post(postUserRegister);
router.route("/login").post(postUserLogin);

module.exports = router;
