const express = require("express");
const router = express.Router();
const { Post, User } = require("../../models");



router.post("/", (req, res) => {
  if(!req.session.userId){
    return res.status(401).send("you need to log in first to be able to create a post!")
  }
  Post.create({
    name: req.body.name,
    description: req.body.description,
    userId:req.session.userId,

  })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.put("/:id",(req,res)=>{
  if(!req.session.userId){
    return res.status(401).send("you need to log in first to be able to update a post!")
  }
  Post.update(req.body, {
      where:{
          id:req.params.id
      }
  }).then(updatePost=>{
      res.json(updatePost)
  })
});

router.delete("/:id",(req,res)=>{
  if(!req.session.userId){
    return res.status(401).send("you need to log in first to be able to delete a post!")
  }
  Post.destroy({
      where:{
          id:req.params.id
      }
  }).then(delPost=>{
      res.json(delPost)
  })
});
module.exports = router;

