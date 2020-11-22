var Bicicleta = require("../models/bicicleta");

exports.bicicleta_list = function (req, res) {
  Bicicleta.allBicis(function (err, bicis) {
    res.render("bicicletas/index", { bicis: bicis }); //Aca paso bicis a la vista
  });
};

exports.bicicleta_create_get = function (req, res) {
  res.render("bicicletas/create");
};

exports.bicicleta_create_post = function (req, res) {
  var bici = new Bicicleta({
    code: req.body.code,
    color: req.body.color,
    modelo: req.body.modelo,
  });
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici, function (err) {
    if (err) {
      return console.log(err);
    } else {
      res.redirect("/bicicletas");
    }
  });
};

exports.bicicleta_delete_post = function (req, res) {
  Bicicleta.deleteById(req.params.id, function (err) {
    if (err) {
      return console.log(err);
    } else {
      res.redirect("/bicicletas");
    }
  });
};

exports.bicicleta_update_get = function (req, res) {
  Bicicleta.findByCode(req.params.code, function (err, bici) {
    if (err) {
      return console.log(err);
    } else {
      res.render("bicicletas/update", { bici });
    }
  });
};

exports.bicicleta_update_post = function (req, res) {
  Bicicleta.findByCode(req.body.code, function (err, bici) {
    //BICI Y ERR SON LOS DOS POSIBLES DATOS DE SALIDA DEL METODO FINDBYCODE Y PASAN COMO ENTRADA DEL CALLBACK
    if (err) {
      return next(err);
    } else {
      var bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
      });
      bici.ubicacion = [req.body.lat, req.body.lng];
      Bicicleta.update(bici, function (err, bici) {
        res.redirect("/bicicletas");
      });
    }
  });
};
