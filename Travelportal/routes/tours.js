var express = require("express");
var router = express.Router();
var Tour = require("../models/tour");
var middleware = require("../middleware/");

//=============================================
//INDEX 
//=============================================

router.get("/", function(req, res) {
    Tour.find({}, function(err, allTours){
        if (err) {
            console.log("error");
        } else {
            //currentUser ----> pass logged in user to index (available to header) to check if loggedin
            res.render("tours/index", {tours:allTours});
        }
    })
});

//=============================================
//CREATE - 
//=============================================
router.post("/", middleware.isLoggedIn,function(req, res) {
    
    //get data from form and add to tours array
    //redirect back to tours page
    var name = req.body.name;
    var desc = req.body.description;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var mode = req.body.mode;
    var price = req.body.price;
    var localTaxi = req.body.localTaxi;
    var destinationTaxi = req.body.destinationTaxi;
    var hotelCost = req.body.hotelCost;
    var manager = req.body.manager;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newTour = {name: name, description:desc, startDate: startDate, endDate:endDate, mode:mode, price: price, localTaxi:localTaxi, destinationTaxi:destinationTaxi, hotelCost:hotelCost, author: author, manager:manager}
    
    //Create new tour and save to DB
    Tour.create(newTour, function(err, newlyCreated) {
        if (err) {
            console.log("error");
        } else {
            console.log(newlyCreated);
            res.redirect("/tours");
        }
    })
});

//=============================================
//NEW - display form for adding new tour
//=============================================
router.get("/new", middleware.isLoggedIn,function(req,res){
    res.render("tours/new");
});

//=============================================
//SHOWs more info about one tour
//=============================================
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    //find tour with provided id 
    Tour.findById(req.params.id).populate("comments").exec(function(err, foundTour) {
       if (err) {
            console.log(err);   
       } else {
            //render show templete with that tour
           res.render("tours/show", {tour: foundTour})
       }
    });
});

//=============================================
//EDIT ROUTE
//=============================================
router.get("/:id/edit", middleware.checkTourOwnership,function(req, res) {
    Tour.findById(req.params.id, function(err, foundTour){
        res.render("tours/edit", {tour: foundTour});
    });      
});

//=============================================
//UPDATE ROUTE
//=============================================
router.put("/:id", middleware.checkTourOwnership, function(req, res) {
   Tour.findByIdAndUpdate(req.params.id, req.body.tour, function(err, updatedTour){
       if (err) {
           res.redirect("/tours");
       } else {
           res.redirect("/tours/"+ req.params.id)
       }
   })
});

//=============================================
//DESTROY route
//=============================================
router.delete("/:id", middleware.checkTourOwnership,function(req,res){
    Tour.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/tours");
        } else {
            res.redirect("/tours");
        }
    });
});


module.exports = router;