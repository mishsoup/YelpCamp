var Campground = require("../models/campground");
var Comment    = require("../models/comment");



//all middleware goes here
var middlewareObject = {};



//middleware
middlewareObject.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

middlewareObject.checkCampgroundOwnership = function(req,res,next){
        if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, campground){
        if (err){
            console.log(err);
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else if (req.user._id.equals(campground.author.id)){
            next();
        } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back");
    }});
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwnership = function(req,res,next){
        if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, comment){
        if (err){
            req.flash("error", "Something went wrong!");
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else if (req.user._id.equals(comment.author.id)){
            next();
        } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back");
    }});
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

module.exports = middlewareObject;