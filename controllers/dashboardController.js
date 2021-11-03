const express = require("express");
const router = express.Router();
const { Post, User } = require("../../models");

router.get("/", (req, res) => {
    Post.findAll({
    include:[User]
})
    .then(dbPosts => {
    if (dbPosts.length) {
        res.json(dbPosts);
    } else {
        res.status(404).json({ message: "No posts found!" });
    }
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err });
    });
});