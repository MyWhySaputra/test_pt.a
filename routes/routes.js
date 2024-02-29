const express = require("express");
const userRouteV1 = require("./v1/UserRoute");
const morgan = require("morgan");

// version 1
const v1 = express.Router();
v1.use(morgan("dev"));
v1.use("/", [userRouteV1]);

const router = express.Router();
router.use("/api/v1", v1);

// default version
router.use("/api", v1);

module.exports = router;