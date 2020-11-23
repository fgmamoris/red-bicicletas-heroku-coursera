var Usuario = require("../../models/usuario");

exports.usuarios_list = function (req, res) {
  Usuario.find({}, (error, usuarios) => {
    res.status(200).json({ usuarios: usuarios });
  });
};

exports.usuarios_create = function (req, res) {
  console.log('Usuarios create');
  var usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
  });
  usuario.save(function (err) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ usuario: usuario });
  });
};

exports.usuarios_delete = function (req, res) {
  Usuario.findByNombre(req.body.nombre, function (err, usuario) {
    if (err) {
      return res
        .status(404)
        .json({ error: ["Error usuario no encontrado en el sistema", error] });
    } else {
      Usuario.deleteByNombre(usuario.nombre, function (err) {
        res.status(204).json();
      });
    }
  });
};
exports.usuarios_reservar = function (req, res) {
  Usuario.findById(req.body.id, function (err, usuario) {
    if (err) {
      return res
        .status(404)
        .json({ error: ["Error Usuario no encontrado en el sistema", error] });
    } else {
      usuario.reservar(
        req.body.bici_id,
        req.body.desde,
        req.body.hasta,
        function (err, reserva) {
          console.log("RESERVA SUCCESSFULL!!!");
          res.status(200).send({ reserva: reserva });
        }
      );
    }
  });
};

/*exports.usuario_reserva_delete = function (req, res) {
  Usuario.findByCode(req.body.code, function (err, bici) {
    //BICI Y ERR SON LOS DOS POSIBLES DATOS DE SALIDA DEL METODO FINDBYCODE Y PASAN COMO ENTRADA DEL CALLBACK
    if (err) {
      return res
        .status(404)
        .json({ error: ["Error bici no encontrada en el sistema", error] });
    } else {
      Bicicleta.deleteByCode(bici.code, function (err) {
        res.status(204).json();
      });
    }
  });
};*/
