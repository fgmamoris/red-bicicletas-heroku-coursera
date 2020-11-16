var moongose = require("mongoose");
var Schema = moongose.Schema;

var bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number],
    index: { type: "2dsphere", sparse: true },
  },
});

//Metodo static para poder utilizar el crear instancia Bicicleta.createInstance
bicicletaSchema.statics.createInstance = function (
  code,
  color,
  modelo,
  ubicacion
) {
  return this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion,
  });
};

//Metodo de instancias, responde a la instancia de este esquema
bicicletaSchema.methods.toString = function () {
  return "code: " + this.code + "| color: " + this.color;
};

//Agrego metodo estatico agreo el metodo directamente al modelo
bicicletaSchema.statics.allBicis = function (cb) {
  return this.find({}, cb);
};

bicicletaSchema.statics.add = function (aBici, cb) {
  this.create(aBici, cb);
};
bicicletaSchema.statics.findByCode = function (aCode, cb) {
  return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
  return this.deleteOne({ code: aCode }, cb);
};

bicicletaSchema.statics.update = function (aBici, cb) {
  return aBici.save();
};
bicicletaSchema.statics.update = function (aBici, cb) {
  console.log(aBici);
  return this.update({
    code: aBici.code,
    modelo: aBici.modelo,
    color: aBici.modelo,
  });
};
module.exports = moongose.model("Bicicleta", bicicletaSchema);

/*var Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
  return "id: " + this.id + "| color: " + this.color;
};

Bicicleta.allBicis = []; //Propiedad

Bicicleta.add = function (aBici) {
  Bicicleta.allBicis.push(aBici);
};

Bicicleta.findById = function (aBiciId) {
  var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);
  if (aBici) return aBici;
  else throw new Error(`No existe bicicleta con id: ${aBiciId}`);
};

Bicicleta.removeById = function (aBiciId) {
  for (var i = 0; i < Bicicleta.allBicis.length; i++) {
    if (Bicicleta.allBicis[i].id == aBiciId) {
      Bicicleta.allBicis.splice(i, 1);
      break;
    }
  }
};

var a = new Bicicleta(1, "rojo", "ubarna", [-41.134889, -71.306174]);
var b = new Bicicleta(2, "blanca", "ubarna", [-41.134889, -71.305974]);

Bicicleta.add(a);
Bicicleta.add(b);
module.exports = Bicicleta;
*/
