const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const Usuario = require("./token");

/*Estategia de passport local*/
passport.use(
  new LocalStrategy(function (email, password, done) {
    Usuario.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Email no existe o incorrecto." });
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
