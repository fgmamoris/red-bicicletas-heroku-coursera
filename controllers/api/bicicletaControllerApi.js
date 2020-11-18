var Bicicleta = require("../../models/bicicleta");

/*exports.bicicleta_list = function(req,res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}
*/
exports.bicicleta_list = function (req, res) {
  Bicicleta.allBicis(function (err, bicis) {
    res.status(200).json({ bicicletas: bicis });
  });
};

exports.bicicleta_create = function (req, res) {
  // var bici = Bicicleta.createInstance({
  //   code: req.body.code,
  //   color: req.body.color,
  //   modelo: req.body.modelo,
  // });
  var bici = new Bicicleta({
    code: req.body.code,
    color: req.body.color,
    modelo: req.body.modelo,
  });
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici, function (err, bici2) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ bicicleta: bici2 });
  });
};
exports.bicicleta_update = function (req, res) {
  Bicicleta.findByCode(req.body.code, function (err, bici) {
    //BICI Y ERR SON LOS DOS POSIBLES DATOS DE SALIDA DEL METODO FINDBYCODE Y PASAN COMO ENTRADA DEL CALLBACK
    if (err) {
      return res
        .status(404)
        .json({ error: ["Error al actualizar la bici", error] });
    } else {
      var bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
      });
      bici.ubicacion = [req.body.lat, req.body.lng];
      Bicicleta.update(bici, function (err, bici) {
        res.status(200).json({ bicicleta: bici });
      });
    }
  });
};

exports.bicicleta_delete = function (req, res) {
  Bicicleta.findByCode(req.body.code, function (err, bici) {
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
};
/* Te das cuenta que ah/ora usamos Bicicleta.allBicis como una función que recibe otra función,
 esta función que recibe es un callback, la cuál recibe a su vez dos parametros una parametro de error 
 y otro de éxito O sea si el callback falla retornará err 
 y si sale todo bien retornará el parametro de exito en este caso le puse bicis entonces la función
  puede retornar una de dos al hacer esto cotinuo colocando lo que quiero que haga después
 de haber cumplido el llamado a la función allBicis,que es lo que ves en la línea */
// exports.bicicleta_list = function (req, res) {
//   console.log("ENTRO");
//   Bicicleta.allBicis({}, (error, bicicletas) => {
//     if (error)
//       return res
//         .status(500)
//         .send({ message: `Error al realizar la peticion: ${error}` });
//     if (!bicis)
//       return res.status(404).send({ message: "NO existen bicicletas" });
//     res.status(200).json({ bicicletas: bicicletas });
//   });
// };

// exports.bicicleta_create = function (req, res) {
//   var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
//   bici.ubicacion = [req.body.lat, req.body.lng];
//   Bicicleta.add(bici);
//   res.status(200).json({
//     bicicleta: bici,
//   });
// };
// exports.bicicleta_update = function (req, res) {
//   var bici = Bicicleta.findById(req.body.id);
//   bici.id = req.body.id;
//   bici.color = req.body.color;
//   bici.modelo = req.body.modelo;
//   bici.ubicacion = [req.body.lat, req.body.lng];
//   // Bicicleta.add(bici);
//   res.status(200).json({
//     bicicleta: bici,
//   });
// };

// exports.bicicleta_delete = function (req, res) {
//   Bicicleta.removeById(req.body.id);
//   res.status(204).send();
// };
