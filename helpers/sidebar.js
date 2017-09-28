var Stats = require('./stats'),    
	Images = require('./images'),    
	Comments = require('./comments');


module.exports = function(viewModel, callback){    
	viewModel.sidebar = {        
		stats: Stats(),        
		popular: Images.popular(),        
		comments: Comments.newest()    
	};

    callback(null, viewModel); 
};


/*
module.exports = function sidebar(viewModel, callback){
	
			var stats = {        
						images:     0,        
						comments:   0,
						views:      0,        
						likes:      0    
			};

			var images = [

							 {            
						   	uniqueId:       1,            
						   	title:          'Sample Image 1',            
						   	description:    '',            
						   	filename:       'sample1.jpg',            
						   	views:          0,            
						   	likes:          0,            
						   	timestamp:      Date.now        
						   }, 

						   {            
						   	uniqueId:       2,            
						   	title:          'Sample Image 2',            
						   	description:    '',            
						   	filename:       'sample2.jpg',            
						   	views:          0,            
						   	likes:          0,            
						   	timestamp:      Date.now        
						   }, 

						   {            
						   	uniqueId:       3,            
						   	title:          'Sample Image 3',            
						   	description:    '',            
						   	filename:       'sample3.jpg',            
						   	views:          0,            
						   	likes:          0,            
						   	timestamp:      Date.now        
						   }, 

						   {
						   	uniqueId:       4,            
						   	title:          'Sample Image 4',            
						   	description:    '',            
						   	filename:       'sample4.jpg',            
						   	views:          0,            
						   	likes:          0,            
						   	timestamp:      Date.now        
						   }    

			];

			var comments = [            
								{                
									image_id:   1,                
									email:      'test@testing.com',                
									name:       'Test Tester',                
									gravatar:   ' http://lorempixel.com/75/75/animals/1',                
									comment:    'This is a test comment...',                
									timestamp:  Date.now(),                
									image: {                    
										uniqueId:       1,                    
										title:          'Sample Image 1',                    
										description:    '',
										filename:       'sample1.jpg',                    
										views:          0,                    
										likes:          0,                    
										timestamp:      Date.now                
									}            
								}, {                
									image_id:   1,                
									email:      'test@testing.com',                
									name:       'Test Tester',                
									gravatar:   'http://lorempixel.com/75/75/animals/2',                
									comment:    'Another followup comment!',                
									timestamp:  Date.now(),                
									image: {                    
										uniqueId:       1,                    
										title:          'Sample Image 1',                    
										description:    '',                    
										filename:       'sample1.jpg',                    
										views:          0,                    
										likes:          0,                    
										timestamp:      Date.now                
									}            
								}        
			];



		viewModel.sidebar = {        
			stats,      
			images,        
			comments  
		};

	    callback(null, viewModel); 
};

*/