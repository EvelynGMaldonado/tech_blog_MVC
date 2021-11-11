const express = require('express');
const router = express.Router();
const {Post, User, Comment} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(postData=>{
        console.log(postData)
        const hbsPosts = postData.map(post=>post.get({plain:true}))
        // res.json(hbsPosts)
        console.log("Line 13",hbsPosts);
        res.render("home",{
            posts:hbsPosts
        })
    })
})


router.get("/single/post/:id",(req,res)=>{
    
    Post.findByPk(req.params.id,{
        include:[User, {
            model:Comment,
            include:[User]
        }]
    }).then(postData=>{
        const post = postData.get({plain:true});
        console.log(post)
        res.render("posts",{ post })
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
        res.redirect("/");
        return
    }
    res.render("signup");

})
module.exports = router;