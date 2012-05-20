
/**
 * Module dependencies.
 */

var express = require('express')
  , spdy = require('spdy')
  , fs = require('fs');


//var app = module.exports = express.createServer();

var options = {
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem')
};

var app = spdy.createServer(express.HTTPSServer, options);


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
  // res.pushFile.apply(res, local_path_and_url("stylesheets/style.css"));
  // res.pushFile.apply(res, local_path_and_url("javascripts/jquery-1.6.2.min.js"));
  // res.pushFile.apply(res, local_path_and_url("images/00-h.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/01-e.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/02-l.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/03-l.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/04-o.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/05-space.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/06-w.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/07-o.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/08-r.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/09-l.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/10-d.jpg"));
  // res.pushFile.apply(res, local_path_and_url("images/11-bang.jpg"));

  res.render('real', {
    title: 'Hello (real) World!'
  });
});

function local_path_and_url(relative_path) {
  return [
    "public/" + relative_path,
    "https://localhost:3000/" + relative_path
  ];
}

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
