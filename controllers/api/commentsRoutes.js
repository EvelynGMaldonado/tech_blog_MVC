const express = require('express');
const router = express.Router();
const {Comment} = require('../../models');



router.post("/", (req, res) => {
if(!req.session.userId){
    return res.status(401).send("you need to log in first to be able to comment a post!")
}
Comment.create({
    body: req.body.body,
    postId: req.body.postId,
    userId:req.session.userId,

})
    .then(newComment => {
    res.json(newComment);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err });
    });
});

module.exports = router;