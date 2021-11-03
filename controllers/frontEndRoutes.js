const express = require('express');
const router = express.Router();
const {Post, User, Comment} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        order:["UserId"],
        include:[User]
    }).then(postData=>{

        const hbsPosts = postData.map(post=>post.get({plain:true}))
        // res.json(hbsPosts)
        res.render("home",{
            posts:hbsPosts
        })
    })
})


router.get("/post/:id",(req,res)=>{
    
    Post.findByPk(req.params.id,{
        include:[User, {
            model:Comment,
            include:[User]
        }]
    }).then(postData=>{
        const post = postData.get({plain:true});
        res.render("post",{ post })
    })
})

router.get("/login",(req,res)=>{
    if(req.session.loggedIn) {
        res.redirect("/");
        return
    }
    res.render("login");

})

router.get("/signup",(req,res)=>{
    if(req.session.loggedIn) {
        res.redirect("/home");
        return
    }
    res.render("home");

})
module.exports = router;