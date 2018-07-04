var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.set('port', process.env.PORT || '3000');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ANADIR AQUI LAS RUTAS DEL FRONTAL
 * QUE QUEREMOS PERMITIR ACCEDER DIRECTAMENTE
 * DESDE LA BARRA DE NAVEGACION
 */
var angularRoutes = [
  '/'
];

app.get(angularRoutes, function (req, res) {
  res.sendfile('./public/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
