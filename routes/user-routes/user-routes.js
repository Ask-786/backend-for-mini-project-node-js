const router = require("express").Router();

const {
  getHome,
  getProfile,
} = require("../../controllers/user-controllers/user-controller");

const {
  isUserAuthenticated,
} = require("../../middlewares/user-middlewares/user-auth-middlewares");

router.route("/").get(isUserAuthenticated, getHome);
router.route("/profile").get(isUserAuthenticated, getProfile);

module.exports = router;
