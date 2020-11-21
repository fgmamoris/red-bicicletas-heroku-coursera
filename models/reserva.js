const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

var reservaSchema = new Schema({
  desde: Date,
  hasta: Date,
  bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: "Bicicleta" }, //
  //Guarda una referencia Referencia al id del modelo del objeto bicicleta, mongo lo agrega directamente
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

//Metodo de instancia
reservaSchema.methods.diasDeReserva = function () {
  return moment(this.hasta).diff(moment(this.desde), "days") + 1;
};

reservaSchema.statics.allReservas = function (cb) {
  return this.find({}, cb);
};
reservaSchema.statics.add = function (reserva, cb) {
  this.create(reserva, cb);
};

reservaSchema.statics.deleteByUsuarioAndBici = function (aReserva, cb) {
  return this.findOneAndDelete(
    { usuario: aReserva.usuario, bicicleta: aReserva.bicicleta },
    cb
  );
};
reservaSchema.statics.findByUsuarioAndBici = function (aUsuario, aBici, cb) {
  return this.findOne({ usuario: aUsuario, bicicleta: aBici }, cb);
};

reservaSchema.statics.updateByUsuarioAndBici = function (aReserva, cb) {
  return this.findOneAndUpdate(
    { usuario: aReserva.usuario, bicicleta: aReserva.bicicleta },
    {
      $set: {
        desde: aReserva.desde,
        hasta: aReserva.hasta,
      },
    },
    { new: true },
    cb
  );
};

module.exports = mongoose.model("Reserva", reservaSchema);
