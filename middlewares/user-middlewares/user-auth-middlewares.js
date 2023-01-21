const jwt = require("jsonwebtoken");

const isUserAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).send("Unauthorized request");

  const token = req.headers.authorization.split(" ")[1];

  if (token === null) return res.status(401).send("Unauthorized request");

  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) return res.status(401).send("Unauthorized request");

    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized request");
  }
};

module.exports = { isUserAuthenticated };
