var express = require('express'), 
	expressValidator = require('express-validator'),
	session = require('express-session'),
	flash = require('connect-flash'),      
	app = express(),
	path = require('path'), 
  fs = require('fs'),   
	routes = require('./controller/index'), 
	images = require('./controller/image'),  
	exphbs = require('express3-handlebars'),
	router = express.Router(),  
	bodyParser = require('body-parser'),    
	cookieParser = require('cookie-parser'),    
	morgan = require('morgan'),    
	methodOverride = require('method-override'),  
	moment = require('moment'),  
	errorHandler = require('errorhandler');



app.engine('handlebars', exphbs.create({    
 	defaultLayout: 'main',    
 	layoutsDir: app.get('views') + '/layouts',    
 	partialsDir: [app.get('views') + '/partials'],
 	helpers: {        
 	 	timeago: function(timestamp) {            
 	 		return moment(timestamp).startOf('minute').fromNow();        
 	 	}
 	}  
 }).engine);
app.set('view engine', 'handlebars');

//Set up middlewares
app.use(morgan('dev'));  
app.use(bodyParser({        
	uploadDir:path.join(__dirname, './public/upload/temp')    
}));  
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
  
app.use(methodOverride());    
app.use(cookieParser('some-secret-value-here'));
app.use('/public/', express.static(path.join(__dirname, '../ public')));
app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));


// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Connect-Flash Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});



//define routes

//router.use('/images/:image_id', require('./controller/image'));
//app.use('/', routes);

app.use('/', routes);
app.use('/images', images);
app.use('/images/:image_id', images);

//router.use('/', routes);


app.set('port', process.env.PORT || 3300); 
app.set('views', __dirname + '/views'); 

var server = app.listen(app.get('port'), function() {  
  console.log('Server up: http://localhost:' + app.get('port'));
 });

