const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const postRoutes = require("./postsController");
router.use("/posts",postRoutes);

module.exports = router;