var mongoose = require("mongoose");
var moment = require("moment");
var Schema = mongoose.Schema;

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

module.exports = mongoose.model("Reserva", reservaSchema);
