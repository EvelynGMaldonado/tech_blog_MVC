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

router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).send("you need to log in first to be able to create a post!")
  }
  Post.create({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    User_id:req.session.user.id,
    post_username:req.session.user.username
  })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

module.exports = router;
