var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.use(partials());
  app.use(express.bodyParser());
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.use(express.static(__dirname + '/client'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

app.get('/', handler.renderIndex);
app.get('/create', handler.renderIndex);

app.get('/links', handler.fetchLinks);
app.post('/links', handler.saveLink);

// app.get('/login', handler.loginUserForm);
// app.post('/login', handler.loginUser);
// app.get('/logout', handler.logoutUser);

// app.get('/signup', handler.signupUserForm);
// app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
