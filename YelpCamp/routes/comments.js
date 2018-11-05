var express = require("express");
var router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");


//comments new
router.get("/new", middleware.isLoggedIn, function(req,res){
    
    //find campground by ID
    Campground.findById(req.params.id, function(err,campground){
        if (err) console.log(err);
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});


//comments create
router.post("/", middleware.isLoggedIn, function(req,res){
    //look up camground using ID
    Campground.findById(req.params.id,function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else{
           Comment.create(req.body.comment, function(err,comment){
               if(err) {
                   console.log(err);
                   req.flash("error", "Something went wrong!");
                } else {
                   //add username and id to comment
                   //save comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Comment successfully created!");
                   res.redirect("/campgrounds/" + campground._id)
               }
           });
       }
    });
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, comment) {
        if (err){
            console.log(err);
            res.redirect("back");
        } else {
        res.render("comments/edit", {comment:  comment, campgroundid: req.params.id});
        }
    });
    
});


//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    var text = req.body.text;
    Comment.findById(req.params.comment_id,function(err, comment) {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            comment.text = text;
            comment.save();
            res.redirect("/campgrounds/" + req.params.id);
        }
    
    });
});


//REMOVE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
        res.redirect("/campgrounds/" + req.params.id);
        }
    })
});



module.exports = router;