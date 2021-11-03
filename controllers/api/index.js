const router = require('express').Router();
const userRoutes = require("./userController");
const postRoutes = require("./postsController");

router.use("/users",userRoutes);
router.use("/posts",postRoutes);
router.use("/comments",commentsRoutes);

module.exports = router;