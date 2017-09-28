var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');
var app = express();
var Models = require('../models');
var MD5 = require('MD5');

/*module.exports = {
    index: function(req, res) {
            res.render('image');
    },
    create: function(req, res) {
            res.send('The image:create POST controller');
    },    
    like: function(req, res) {
            res.send('The image:like POST controller');
    },    
    comment: function(req, res) {
            res.send('The image:comment POST controller');
    } 
};
*/

// Image
router.get('/', function(req, res, callback){
    var viewModel = {  

        image: {},    

        comments: [] 
    };

    Models.Image.findOne({ filename: { $regex: req.params.image_id } }, 
           function(err, image) {     
              if (err) { throw err; }    
                      if (image) {            
                          image.views = image.views + 1; 
                          viewModel.image = image; 
                          image.save();
                          // find any comments with the same image_id as the image: 
                          Models.Comment.find({ image_id: image._id}, {}, { sort: { 'timestamp': 1 }}, 
                              function(err, comments){
                                  //if (err) { throw err; }
                                  viewModel.comments = comments;
                                  res.render('image', viewModel);
                             } 
                         );
                      } else {            
                         res.redirect('/');        
                        }     
    });


    
    
    /*
    sidebar(viewModel, function(viewModel) {    
        res.render('image', viewModel); 
    });
    */

});


router.post('/images',  function(req, res) {
          
          // create Image function
    var saveImage = function() {    

        // Randomly generate 6 characters
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var imgUrl = '';

        for(var i=0; i < 6; i+=1) {    
            imgUrl += possible.charAt(Math.floor(Math.random() * possible. length));
        }

        // search for an image with the same filename by performing a find:    
        Models.Image.find({ filename: imgUrl }, function(err, images) {    
            if (images.length > 0) {            
              // if a matching image was found, try again (start over):            
              saveImage(); 
            } else{     
                // Define temporal and Permanent location for uploaded image
                    var tempPath = req.files.file.path;
                    var ext = path.extname(req.files.file.name).toLowerCase();
                    var targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                    //store the correct uploaded Image format or delete incorrect formats
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function(err) {    
                            if (err) throw err;
                        //res.redirect('/images'); 

                            var newImg = new Models.Image({    
                              title: req.body.title,    
                              description: req.body.description,    
                              filename: imgUrl + ext    
                            }); 

                            newImg.save(function(err, image) {    
                              console.log('Successfully inserted image: ' + image.filename);    
                              res.redirect('/images/' + image.uniqueId); 
                            });

                        }); 
                    } else {    
                        fs.unlink(tempPath, function () {     
                            if (err) throw err;
                        res.json(500, {error: 'Only image files are allowed.'});    
                        }); 
                    }

            }

        });

     
      
   }; 

   saveImage();
});

router.post('/images/:image_id/like', function(req, res) {

    //res.json({likes: 1});
    Models.Image.findOne({ filename: { $regex: req.params.image_id } },
        function(err, image) {    
            if (!err && image) {      
                  image.likes = image.likes + 1;            
                  image.save(function(err) {           
                       if (err) {                    
                        res.json(err);                
                      } else {                    
                        res.json({ likes: image.likes });                
                      }            
                  });        
            }    
        })


});

router.post('/images/:image_id/comment', function(req, res) {
      console.log(req, 'request');

        //res.send('The image:comment POST controller');
        Models.Image.findOne({ filename: { $regex: req.params.image_id } }, 
           function(err, image) {     
                if (!err && image) {    
                    var newComment = new Models.Comment(req.body);            
                    newComment.gravatar = md5(newComment.email);            
                    newComment.image_id = image._id;            
                    newComment.save(function(err, comment) {            
                        if (err) { throw err; }
                         res.redirect('/images/' + image.uniqueId + '#' + comment._id);            
                    });  

                } else {            
                        res.redirect('/');        
                }    
          }); 


});


app.use('/', router); 
module.exports = router;
