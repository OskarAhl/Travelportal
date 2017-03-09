var mongoose = require("mongoose");

//SCHEMA setup
var tourSchema = new mongoose.Schema({
   name: String,
   startDate: Date,
   endDate: Date,
   mode: String,
   price: Number,
   localTaxi: Number,
   destinationTaxi: Number,
   hotelCost: Number,
   description: String,
   manager: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

var Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
