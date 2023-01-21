const router = require("express").Router();

router.route("/hello").get((req, res, next) => {
  res.json("hello");
});

module.exports = router;
