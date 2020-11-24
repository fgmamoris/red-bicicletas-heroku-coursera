const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../models/usuario");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const FacebookTokenStrategy = require('passport-facebook-token');

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.HOST + "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      Usuario.findOneOrCreateByGoogle(profile, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
/*Estrategia de google passport*/ 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.HOST + "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //Profile trae todos los datos de cuenta
      console.log(profile);
      Usuario.findOneOrCreateByGoogle(profile, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
/*Estrategia de google passport*/ 
// passport.use(
//   new FacebookTokenStrategy(
//     {
//       clientID: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       try {
//         Usuario.findOneOrCreateByFacebook(profile, function (err, user) {
//           if (err) {
//             console.log("Error: " + err);
//           }
//           return done(err, user);
//         });
//       } catch (error) {
//         console.log(error);
//         return done(error, null);
//       }
//     }
//   )
// );
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
