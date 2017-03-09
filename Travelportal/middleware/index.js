var Tour = require("../models/tour");


var middlewareObj = {};

middlewareObj.checkTourOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
            Tour.findById(req.params.id, function(err, foundTour){
                if (err) {  
                    req.flash("error", "Tour Not Found")
                    res.redirect("back");
                } else {
                    if(foundTour.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You Don't Have Permission To Do That");
                        res.redirect("back");
                    }
                }
            });      
        } else { 
            req.flash("error", "You Need To Be Logged In To Do That");
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    //flashes on login form
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}




module.exports = middlewareObj;