const mongoose = require("mongoose");
const Reserva = require("../models/reserva");
const Schema = mongoose.Schema;
const bcrypt = required("bcrypt");
const saltRounds = 10; //Da aleatoreadad a la encriptacion
const uniqueValidator = require("mongoose-unique-validator");

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
});

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

module.exports = mongoose.model("Usuario", usuarioSchema);
