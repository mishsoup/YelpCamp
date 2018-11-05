var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {   name:"Cloud's Rest",
        image:"http://vivalifestyleandtravel.com/images/cache/c-1509320428-1278115973.jpg",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."},
    {
        name:"Coolio Camp",
        image:"https://media-cdn.tripadvisor.com/media/photo-s/01/f7/c7/5a/campsite.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        name:"Mango's Camp",
        image:"http://detk34b2vej48ehj51qbb541.wpengine.netdna-cdn.com/wp-content/uploads/2016/02/PICNIC-TABLE-CAMPING.jpg",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
    
    ];


function seedDB() {
    //Remove all campgrounds
    Campground.remove({},function(err){
            if (err)
            console.log(err);
            else 
            console.log("removed campgrounds");
            
                //add campgrounds
        // data.forEach(function(seed){
        //   Campground.create(seed, function(err, campground){
        //       if (err)console.log(err);
        //       else
        //       {
        //           console.log("added a campground");
        //           //create a comment
                   
        //           Comment.create(
        //               {
        //               text:"This place is great, but I wish it has Internet",
        //               author:"Homer"
        //                 }, function(err,comment){
        //                     if(err) console.log(err);
        //                     else campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 });
        //       }
        //   }); 
        // });
        
    });
    

}


module.exports = seedDB;