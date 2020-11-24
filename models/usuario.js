const mongoose = require("mongoose");
const Reserva = require("../models/reserva");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10; //Da aleatoreadad a la encriptacion
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const mailer = require("../mailer/mailer");
const Token = require("../models/Token");

const validateEmail = function (email) {
  //Regex, expresion regular
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email); //Valida que el string tenga el patron de la expresion regular
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "El nombre es obligatorio"], //Tengo que ponerlo ya que el mensaje viene en ingles
  },
  email: {
    type: String,
    trim: true,
    required: [true, "El email es obligatorio"], //Tengo que ponerlo ya que el mensaje viene en ingles
    lowercase: true, //Guarda todo en mminuscula
    validate: [validateEmail, "Por favor ingrese un email valido"], // validate pertenece a mongoose
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"], //Tengo que ponerlo ya que el mensaje viene en ingles
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false,
  },
  googleId: String,
  facebookId: String,
});

//Le incorporo a mongoose la libreria de uniqueValidator
usuarioSchema.plugin(uniqueValidator, {
  message: "El {PATH} ya existe con otro usuario",
});

//Function pre Antes de guardar(persistir en la bbdd) ejecuta la callback
usuarioSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
}); //Sirve para encryptar passowd

//Verifico la veracidad del password
usuarioSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password); //encripto y comparo con el password que tengo en la bbdd
};

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde: desde,
    hasta: hasta,
  });

  reserva.save(cb);
};

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex"), //Creamos un string en hexadecimal
  });
  const email_destination = this.email;
  //Persistencia del token
  token.save(function (err) {
    if (err) {
      return console.log(err.message);
    }
    const mailOptions = {
      from: "no-reply@redbicicletas.com",
      to: email_destination,
      subject: "Verificación de Cuenta",
      text:
        "Hola,\n\n" +
        "Por favor, para verificar su cuenta haga click en este link:\n\n" +
        "http://localhost:3000" +
        //process.env.HOST +
        "/token/confirmation/" +
        token.token +
        "\n",
      html:
        "Hola,<br><br>" +
        "Por favor, para verificar su cuenta haga click en este link:<br><br>" +
        '<a href="' +
        "http://localhost:3000" +
        //process.env.HOST +
        "/token/confirmation/" +
        token.token +
        '" target="_blank">Activar Usuario</a>.<br>',
    };

    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(
        "Se ha enviado un email de verificación a " + email_destination + "."
      );
    });
  });
};

usuarioSchema.methods.resetPassword = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) return cb(err);

    const mailOptions = {
      from: "no-reply@redbicicletas.com",
      to: email_destination,
      subject: "Reseteo de Password de Cuenta",
      text:
        "Hola,\n\n" +
        "Por favor, para resetear el password de su cuenta haga click en este link:\n\n" +
        "http://localhost:3000" +
        //process.env.HOST +
        "/resetPassword/" +
        token.token +
        ".\n",
      html:
        "Hola,<br><br>" +
        "Por favor, para resetear el password de su cuenta haga click en este link:<br><br>" +
        '<a href="' +
        "http://localhost:3000" +
        //   process.env.HOST +
        "/resetPassword/" +
        token.token +
        '" target="_blank">Restablecer Contraseña</a>.<br>',
    };

    mailer.sendMail(mailOptions, function (err) {
      if (err) return cb(err);
      console.log(
        "Se envió un email para restablecer contraseña a " +
          email_destination +
          "."
      );
    });
    cb(null);
  });
};

usuarioSchema.statics.allUsuarios = function (cb) {
  return this.find({}, cb);
};

usuarioSchema.statics.add = function (aUsuario, cb) {
  this.create(aUsuario, cb);
};

usuarioSchema.statics.findByNombre = function (aNombre, cb) {
  return this.findOne({ nombre: aNombre }, cb);
};
usuarioSchema.statics.deleteByNombre = function (aNombre, cb) {
  this.deleteOne({ nombre: aNombre }, cb);
};

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(
  condition,
  callback
) {
  console.log('**************************************');
  const self = this;
  console.log(condition);
  this.findOne(
    {
      $or: [{ googleId: condition.id }, { email: condition.emails[0].value }],
    },
    (err, result) => {
      if (result) {
        //si exite usuario entro por result, login
        callback(err, result);
      } else {
        //registros
        let values = {};
        console.log("=============== CONDITION ===============");
        console.log(condition);
        values.googleId = condition.id;
        values.email = condition.emails[0].value;
        values.nombre = condition.displayName || "SIN NOMBRE";
        values.verificado = true;
        //values.password = condition._json.etag;
        //values.password = 'oauth'; //condition._json.etag;
        //values.password = condition.id;
        //values.password = condition._json.etag;
        values.password = crypto.randomBytes(16).toString('hex');
        console.log("=============== VALUES ===============");
        console.log(values);
        self.create(values, function (err, user) {
          if (err) {
            console.log(err);
          }

          return callback(err, user);
        });
      }
    }
  );
};
/*
usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(
  condition,
  callback
) {
  const self = this;
  console.log(condition);
  this.findOne(
    {
      $or: [{ facebookId: condition.id }, { email: condition.emails[0].value }],
    },
    (err, result) => {
      if (result) {
        callback(err, result);
      } else {
        let values = {};
        console.log("=============== CONDITION ===============");
        console.log(condition
        values.facebookId = condition.id;
        values.email = condition.emails[0].value;
        values.nombre = condition.displayName || "SIN NOMBRE";
        values.verificado = true;
        values.password = crypto.randomBytes(16).toString("hex"
        console.log("=============== VALUES ===============");
        console.log(values
        self.create(values, function (err, user) {
          if (err) {
            console.log(err);
         
          return callback(err, user);
        });
      }
    }
  );
*/
module.exports = mongoose.model("Usuario", usuarioSchema);
