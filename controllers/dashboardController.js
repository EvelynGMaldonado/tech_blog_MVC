const express = require("express");
const router = express.Router();
const { Post, User} = require("../models");

//localhoast.com/home
router.get("/",(req,res)=>{
    
    if(!req.session.userId){
        console.log(req.session)
        return res.status(401).send("you need to log in first to be able to update a post!")
        
    }
    Post.findAll({
        where: {
            userId:req.session.userId,
        }
    }).then(postData=>{

        const hbsPosts = postData.map(post=>post.get({plain:true}))
       console.log("HIT--------------", hbsPosts)
        res.render("dashboard",{
            posts:hbsPosts
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err });
    });
});
//localhoast.com/dashboard/create-post
router.get("/createpost", (req, res) => {
    if(!req.session.user){
        return res.status(401).send("you need to log in first to be able to update a post!")
    }
    res.render("createpost")

});

router.get("/update-post/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).send("you need to log in first to be able to update a post!")
    }
    Post.findByPk(req.params.id)
    .then(singlePost => {
        if(singlePost){
            const post = singlePost.map(post=>post.get({plain:true}))
            // res.json(hbsPosts)
            res.render("updatepost",{
                post
            })
        }else{
            res.status(400).json({message:"post not found"})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err });
    });
    
})
module.exports = router;