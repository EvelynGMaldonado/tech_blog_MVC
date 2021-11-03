const router = require('express').Router();
const frontEndRoutes = require("./frontEndRoutes.js");
const apiRoutes = require("./api");
const dashboardController = require("./dashboardController.js")


router.use("/", frontEndRoutes);
router.use("/api",apiRoutes);
router.use("/dashboard", dashboardController);


module.exports = router;