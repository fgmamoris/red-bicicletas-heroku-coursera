var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require ('./config/passport');
const session = require('express-session')

var indexRouter = require("./routes/index");
var indexExpress = require("./routes/indexExpress");
var usersRouter = require("./routes/usuarios");
var bicicletasRouter = require("./routes/bicicletas");
var bicicletasApiRouter = require("./routes/api/bicicletas");
var usuariosApiRouter = require("./routes/api/usuarios");
var reservasApiRouter = require("./routes/api/reservas");
var tokenController = require("./routes/token");

/*
Guarda el store en memoria del servidor, si el servidor se resetea 
se borran los datos de session de los usuarios logeados y 
redirije a login 
*/
const store = new session.MemoryStore; 

var app = express();
var mongoose = require("mongoose");
/*CONEXION BD */
var mongoDB = "mongodb://localhost/red_bicicletas";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo DB conection error: "));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
/*
Configuracion de la cookie de la session
*/
app.use(session({
  cookie: {maxAge: 240*60*1000},//10 dias para que expire la session
  store: store,
  saveUninitialized: true,
  resave:'true',
  secret: 'red_bici_!_12_1!´',//Genera la insciptacion de la session de la cookie
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*Configuracion de session en el servidor, inicializado 
*/
app.use(passport.inicialized());
app.use(passport.session());
//************ */
app.use(express.static(path.join(__dirname, "public")));

app.get('/login', function(req,res){
  res.render('session/login');
});

app.post('/login', function(req, res){
//passport
});

app.get('/logut', function(req,res){

  res.redirect('/');
});

app.get('forgotPassword', function(req, res){

});
app.post('forgotPassword', function(req, res){
  
})

app.use("/", indexRouter);
app.use("/express", indexExpress); //Deja de utilizarlo luego de token
app.use("/usuarios", usersRouter);
app.use("/bicicletas", bicicletasRouter);
app.use("/api/bicicletas", bicicletasApiRouter);
app.use("/api/usuarios", usuariosApiRouter);
app.use("/api/usuarios/reservas", reservasApiRouter);
app.use("/token", tokenController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
