var Usuario = require("../../models/usuario");

exports.usuarios_list = function (req, res) {
  Usuario.find({}, (error, usuarios) => {
    res.status(200).json({ usuarios: usuarios });
  });
};

exports.usuarios_create = function (req, res) {
  var usuario = new Usuario({ nombre: res.body.nombre });
  usuario.save(function (err) {
    res.status(200).json({ usuario });
  });
};

exports.usuario_reservar = function (req, res) {
  Usuario.findById(res.body.id, function (err, usuario) {
    console.log(usuario);
    usuario.reservar(req.body_id, req.body.desde, req.body.hasta, function (
      err
    ) {
      console.log("RESERVA!!!");
      res.status(200).send();
    });
  });
};
