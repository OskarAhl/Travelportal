var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req, res) {
    res.render("tours");
});

//=========================================
///AUTHENTICATION
//=========================================

router.get("/register", function(req, res) {
    res.render("register");
});


//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            console.log(err);
            return res.render("register")
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome To The Travel Portal " + user.username )
            res.redirect("/tours");
        })
    });
});


///SHOW login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Handle login logic - with middleware - when request to /login comes passport.authenticate will run FIRST
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/tours",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/tours");
});


module.exports = router
