const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json(req.session);
})

router.get("/addcounter",(req,res)=>{
    if(req.session.count){
        req.session.count++
    } else {
        req.session.count = 1;
    }
    res.send("count updated!")
})

router.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.send(`welcome to the dashboard, ${req.session.user.username}!`)
    } else{
        res.status(401).send("login first to see, edit or update your posts and comment other posts")
    }
})

module.exports = router;