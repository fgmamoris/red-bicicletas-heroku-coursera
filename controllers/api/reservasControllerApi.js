const { json } = require("body-parser");
const { update } = require("../../models/reserva");
var Reserva = require("../../models/reserva");

exports.reservas_list = function (req, res) {
  Reserva.find({}, (error, reservas) => {
    res.status(200).json({ reservas: reservas });
  });
};

exports.reservas_delete = function (req, res) {
  console.log(req.body);
  const reservaDelete = new Reserva({
    usuario: req.body.usuario,
    bicicleta: req.body.bicicleta,
  });
  Reserva.deleteByUsuarioAndBici(reservaDelete, function (err) {
    if (err) {
      return res.status(500).json({
        error: ["Error Reserva no se pudo guardar en el sistema", error],
      });
    }
    res.status(204).json();
  });
};

exports.reservas_update = function (req, res) {
  const reservaUpdate = new Reserva({
    usuario: req.body.usuario,
    bicicleta: req.body.bicicleta,
    desde: req.body.desde,
    hasta: req.body.hasta,
  });

  Reserva.updateByUsuarioAndBici(reservaUpdate, function (err, reserva) {
    if (err) {
      return res.status(500).json({
        error: ["Error Reserva no se pudo guardar en el sistema", error],
      });
    }
    res.status(200).json({ reserva: reserva });
  });
};
