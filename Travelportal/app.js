var express          = require("express"), 
    app              = express(),
    request          = require("request"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    Tour             = require("./models/tour"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    User             = require("./models/user"),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash");

var tourRoutes       = require("./routes/tours"),
    indexRoutes      = require("./routes/index");


// mongoose.connect("mongodb://localhost/travel_portal");
mongoose.connect("mongodb://oskar:ulysses@ds123410.mlab.com:23410/travelportal");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//Passport configuration
app.use(require("express-session")({
    secret: "gryffindor",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser: req.user to everywhere (make req.user availanle to all ejs)
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/tours", tourRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("connected"); 
});

