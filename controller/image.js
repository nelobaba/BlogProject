var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

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
router.get('/', function(req, res){
    var viewModel = {  

        image: {        
            uniqueId:       1,        
            title:          'Sample Image 1',        
            description:    'This is a sample.',        
            filename:       'sample1.jpg',        
            views:          0,        
            likes:          0,        
            timestamp:      Date.now    
        },    

        comments: [        
        {
            image_id:   1,            
            email:      'test@testing.com',            
            name:       'Test Tester',            
            gravatar:   'http://lorempixel.com/75/75/animals/1',            
            comment:    'This is a test comment...',            
            timestamp:  Date.now()        
        },

        {            
            image_id:   1,            
            email:      'test@testing.com',            
            name:       'Test Tester',            
            gravatar:   'http://lorempixel.com/75/75/animals/2',            
            comment:    'Another followup comment!',            
            timestamp:  Date.now()        
        }    

        ] 
    }


    sidebar(viewModel, function(viewModel) {    
        res.render('image', viewModel); 
    });

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

        // Define temporal and Permanent location for uploaded image
        var tempPath = req.files.file.path;
        var ext = path.extname(req.files.file.name).toLowerCase();
        var targetPath = path.resolve('./public/upload/' + imgUrl + ext);

        //store the correct uploaded Image format or delete incorrect formats
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            fs.rename(tempPath, targetPath, function(err) {    
                if (err) throw err;
            res.redirect('/images');    
            }); 
        } else {    
            fs.unlink(tempPath, function () {     
                if (err) throw err;
            res.json(500, {error: 'Only image files are allowed.'});    
            }); 
        }

    };

    saveImage(); 
      
});


module.exports = router;
