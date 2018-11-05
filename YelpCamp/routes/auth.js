var express = require("express");
var router  = express.Router();
var passport       = require("passport");

var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var User       = require("../models/user");

//root route
router.get("/", function(req, res) {
   res.render("landing"); 
});


//register form
router.get("/register",function(req,res){
  res.render("register"); 
});


//handles register logic
router.post("/register",function(req,res){
    User.register(new User({username: req.body.username}),
    req.body.password,
    function(err,user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to YelpCamp " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});


//login form page
router.get("/login", function(req,res){
    res.render("login");
});


//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"}), function(req,res){
    });

    
//logout logic
router.get("/logout", function(req,res){
  req.logout();
  req.flash("success", "Logged you out!")
  res.redirect("/campgrounds");
});


module.exports = router;