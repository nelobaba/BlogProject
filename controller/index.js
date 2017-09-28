var express = require('express');
var router = express.Router();
var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image;
var app = express();


router.get('/',  function(req, res){
	var viewModel = {    
		images: {}
	};
	

	/*
	sidebar(viewModel, function(viewModel) {    
		res.render('index', viewModel); 
	});
	*/

	ImageModel.find({}, {}, { sort: { timestamp: -1 }},  
		 function(err, images) {     
		    if (err) { throw err; }

			viewModel.images = images;

			res.render('index', viewModel); 
		});

});


app.use('/', router); 

module.exports = router;
        




