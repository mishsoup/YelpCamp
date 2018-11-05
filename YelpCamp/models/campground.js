var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    author : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userid"
        },
        username: String
    },
    comments:[
       {
           type: mongoose.Schema.Types.ObjectId,
           ref:"Comment"
       } 
    ]
});

module.exports = mongoose.model("Campground", campgroundsSchema);