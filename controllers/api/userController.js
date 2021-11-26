const express = require('express');
const router = express.Router();
const {User,Post} = require('../../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    User.findAll({
        include:[Post]
    }).then(dbUsers=>{
        if(dbUsers.length){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/",(req,res)=>{
    // const encryptedPassword = bcrypt.hashSync(req.body.password,3);
    User.create({
        username:req.body.username,
        // password:encryptedPassword,
        password:req.body.password,
        // email:req.body.email
    }).then(newUser=>{
        console.log(newUser);
        req.session.save(()=>{
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        })
       
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
    
        if(!foundUser){
            res.status(401).json({message:"incorrect email or password"})
            return;
        } 
        // else {
        //     if(bcrypt.compareSync(req.body.password,foundUser.password)){
        //         req.session.user = {
        //             username:foundUser.username,
        //             email:foundUser.email,
        //             id:foundUser.id
        //         }
        //         res.json(foundUser)
        //     } else {
        //         res.status(401).json({message:"incorrect email or password"})
        //     }
        // }
        const isValidPassword = foundUser.checkPassword(req.body.password)
        //if is not valid then respond with 4000 code
        if(!isValidPassword) {
            res.status(400).json({message:"Invalid password"})
            return;
        } 
        //else save session and response with success code
        req.session.save(() =>{
            req.session.userId = foundUser.id;
            req.session.username = foundUser.username;
            req.session.loggedIn = true;

             res.status(200).json({message: "Success!"})
        });
       
    }).catch(err=> {
        console.log(err);
        res.status(500).json(err);
    })
})



// router.get("/logout", (req, res) => {
//     if(req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(200).end();
//             return;
//         })
//     } else {
//         res.status(400).end();
//     }
// });

module.exports = router;