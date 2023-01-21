const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const dbConn = require("./config/db-cofig");

const adminAuthRoutes = require("./routes/admin-routes/admin-auth-routes");
const userAuthRoutes = require("./routes/user-routes/user-auth-routes");
const userRoutes = require("./routes/user-routes/user-routes");

dbConn();
app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin/login", adminAuthRoutes);
app.use("/auth", userAuthRoutes);
app.use("/", userRoutes);

app.listen(2001);
