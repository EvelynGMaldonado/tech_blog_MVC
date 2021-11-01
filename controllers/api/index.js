const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const petRoutes = require("./postsController");
router.use("/posts",petRoutes);

module.exports = router;