const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get("/",async(req,res)=>{
    if(!req.user){ return res.redirect('/login') };
const arr = await URL.find({createdBy:req.user._id});
if(arr){
    res.render("index",{cust_arr:arr});
}
else{
    console.log("There was an error in staticroute");
}
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login",{error:""});
});


module.exports = router; 