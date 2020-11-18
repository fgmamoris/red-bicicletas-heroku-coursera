var mongoose = require("mongoose");
var Reserva = require("../models/reserva");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre: String,
});

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
