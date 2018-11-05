var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")


//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function (req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price       = req.body.price;
    var newCampground = {name: name, image: image, price: price, description: description, author: {
        id: req.user._id,
        username: req.user.username
    }};
    Campground.create(newCampground, function(err,newlyCreated){
       if (err){
           console.log(err);
           req.flash("error", "Something went wrong!");
       } else {
           req.flash("success", "Campground successfully created!");
           res.redirect("/campgrounds");
       }
    });
    
    
});


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});


//SHOW - show more info about campground
router.get("/:id", function(req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
       if(err){
           console.log(err);
       } else {
            res.render("campgrounds/show", {campground: foundCampground});
       }
    });
   
   
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function (err, campground){
        res.render("campgrounds/edit",{campground: campground});
});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    Campground.findById(req.params.id, function (err, campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        campground.name = name;
        campground.image = image;
        campground.price = price;
        campground.description = description;
        campground.save();
        res.redirect("/campgrounds/" + campground._id);
})});


//DELETE CAPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function (err){
                if (err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});



module.exports = router;