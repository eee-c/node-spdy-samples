
/**
 * Module dependencies.
 */

var express = require('express-spdy')
  , fs = require('fs');
//  , gzip = require('connect-gzip');

//var app = module.exports = express.createServer();

var app = module.exports = express.createServer({
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem'),
  NPNProtocols: ['spdy/2', 'http/1.1'],
  push: simplePush
});


function simplePush(response) {
  // Only push in response to the first request
  if (response.streamID > 1) return;


  response.pushFile.apply(response, local_path_and_url("stylesheets/style.css"));
  response.pushFile.apply(response, local_path_and_url("javascripts/jquery-1.6.2.min.js"));
  response.pushFile.apply(response, local_path_and_url("images/00-h.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/01-e.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/02-l.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/03-l.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/04-o.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/05-space.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/06-w.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/07-o.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/08-r.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/09-l.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/10-d.jpg"));
  response.pushFile.apply(response, local_path_and_url("images/11-bang.jpg"));
}

function local_path_and_url(relative_path) {
  return [
    "public/" + relative_path,
    "https://localhost:3000/" + relative_path
  ];
}


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  //app.use(gzip.staticGzip(__dirname + '/public'));
});

// Only gzip javascript files:
//gzip.staticGzip(__dirname + '/public', { matchType: /javascript/ });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/real', function(req, res){
  res.render('real', {
    title: 'Hello (real) World!'
  });
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
