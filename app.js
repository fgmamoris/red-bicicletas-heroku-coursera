require('dontenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("./config/passport");
const session = require("express-session");
const Usuario = require("./models/usuario");
const Token = require("./models/Token");
const jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var indexExpress = require("./routes/indexExpress");
var usersRouter = require("./routes/usuarios");
var bicicletasRouter = require("./routes/bicicletas");
var bicicletasApiRouter = require("./routes/api/bicicletas");
var usuariosApiRouter = require("./routes/api/usuarios");
var reservasApiRouter = require("./routes/api/reservas");
var tokenController = require("./routes/token");
const authControllerApiRouter = require("./routes/api/auth");

/*
Guarda el store en memoria del servidor, si el servidor se resetea 
se borran los datos de session de los usuarios logeados y 
redirije a login 
*/
const store = new session.MemoryStore();

var app = express();

//Seteo la secret_key
app.set("secret_key", "jwt_pwd_!!223344");

var mongoose = require("mongoose");
const authControllerApi = require("./controllers/api/authControllerApi");

/*CONEXION BD ATLAS*/
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo DB conection error: "));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
/*Deprecation findOneAndUpdate*/
mongoose.set("useFindAndModify", false);
/*
Configuracion de la cookie de la session
*/
app.use(
  session({
    cookie: { maxAge: 240 * 60 * 1000 }, //10 dias para que expire la session
    store: store,
    saveUninitialized: true,
    resave: "true",
    secret: "red_bici_!_12_1!´", //Genera la insciptacion de la session de la cookie
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*Configuracion de session en el servidor, inicializado
 */
app.use(passport.initialize());
app.use(passport.session());
//************ */
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", function (req, res) {
  res.render("session/login");
});

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    /*Si no existe usuario redirijo a login con la info */
    if (!user) return res.render("session/login", { info });
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next); //Le paso los parametros ala funtion de passport authenticate, y ejecuta la estrategia
  //para validar el usuario
});

app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

app.get("/forgotPassword", function (req, res) {
  res.render("session/forgotPassword");
});

app.post("/forgotPassword", function (req, res, next) {
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    if (!usuario) {
      return res.render("session/forgotPassword", {
        info: { message: "No existe el email para el usuario existente" },
      });
    }
    usuario.resetPassword(function (err) {
      if (err) return next(err);
      console.log("session/forgotPasswordMessage");
    });
    res.render("session/forgotPasswordMessage");
  });
});

app.get("/resetPassword/:token", function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) {
      return res.status(400).send({
        type: "not-verified",
        msg:
          "No existe usuario asociado al token. Verifique que su token no haya expirado",
      });
    }
    Usuario.findById(token._userId, function (err, usuario) {
      if (!usuario) {
        return res.status(400).send({
          msg: "No existe un usuario asociado al token",
        });
      }
      res.render("session/resetPassword", { errors: {}, usuario: usuario });
    });
  });
});

app.post("/resetPassword", function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    res.render("session/resetPassword", {
      errors: {
        confirm_password: {
          message: "No coincide con el password ingresado",
        },
      },
      usuario: new Usuario({ email: req.body.email }),
    });
    return;
  }

  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    usuario.password = req.body.password;

    usuario.save(function (err) {
      if (err) {
        res.render("session/resetPassword", {
          errors: err.errors,
          usuario: new Usuario({ email: req.body.email }),
        });
      } else {
        res.redirect("/login");
      }
    });
  });
});

app.use("/", indexRouter);
app.use("/express", indexExpress); //Deja de utilizarlo luego de token
app.use("/usuarios", usersRouter);
//app.use("/bicicletas", bicicletasRouter); //Sin sec la ruta por default
app.use("/bicicletas", loggedIn, bicicletasRouter); //Securizo la ruta
//app.use("/api/bicicletas",  bicicletasApiRouter);// Sin aute jwt
app.use("/api/bicicletas", validarUsuario, bicicletasApiRouter); // jwt para api
app.use("/api/usuarios", usuariosApiRouter);
app.use("/api/usuarios/reservas", reservasApiRouter);
app.use("/token", tokenController);
app.use("/api/auth", authControllerApiRouter);

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

function loggedIn(req, res, next) {
  /*Identifica si la session esta guardado en el middelware */
  if (req.user) {
    next();
  } else {
    console.log("Usuario sin loguearse");
    res.redirect("/login");
  }
}
function validarUsuario(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"], //Atributo en el header
    req.app.get("secret_key"), //Toma la secret key que cifra el token
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        req.body.userId = decoded.id; //Descifro el token,luego lo cifro y lo envio en el payload
        console.log("JWT Verify: " + decoded);
        next();
      }
    }
  );
}

module.exports = app;
