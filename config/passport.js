const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../models/usuario");

passport.use(
  new LocalStrategy(function (username, password, done) {
    Usuario.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Username incorrecto." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Password incorrecto." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

/*Trae el usuario serializado 
*/
passport.deserializeUser(function (id, done) {
  Usuario.findById(id, function (err, usuario) {
    done(err, usuario);
  });
});

module.exports = passport;