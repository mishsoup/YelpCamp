var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var passport       = require("passport");
var LocalStrategy  = require("passport-local").Strategy;
var mongoose       = require("mongoose");
var Campground     = require("./models/campground");
var Comment        = require("./models/comment");
var seedDB         = require("./seeds");
var User           = require("./models/user");
var methodOverride = require("method-override");
var flash          = require("connect-flash");


//requiring routes
var commentRoutes  = require("./routes/comments");
var campgroundRoutes  = require("./routes/campgrounds");
var authRoutes  = require("./routes/auth");

var url = process.env.DATABSEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url,
 {  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false}).then(() => console.log("worked"))
    .catch(err => console.log("failed", err));
// mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "Mango is the cutest dog!",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// so that we could access currenUser on all the ejs
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});




app.use(authRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);


// seedDB();

var PORT = process.env.PORT || 3000

app.listen(PORT, process.env.IP, function(){
    console.log("Server started!")
});