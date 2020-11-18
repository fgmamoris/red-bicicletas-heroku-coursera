var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");
var Reserva = require("../../models/reserva");
const Usuario = require("../../models/usuario");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/bicicletas";

describe("Testing Usuarios API", function () {
  beforeAll((done) => {
    mongoose.connection.close(done);
  }); //Soluciona el error de multiples conexiones a mongo
  //Tambien se puede poner en el beforeEach()
  /*********
   * Ojo no poner en el afterEach() ya que si no se corre el test, la conexion no se cierra, solo poner
   * afterEach cuando los test pasan
   */

  beforeEach(function (done) {
    var mongoDB = "mongodb://localhost/testdb";
    //mongoose.disconnect();
    mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Mongo DB connection error: "));
    db.once("open", function () {
      console.log("We are connected to test database");
      done();
    });
  });

  afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      Usuario.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, function (err, success) {
          if (err) console.log(err);
          mongoose.disconnect(err);
          done();
        });
      });
    });
  });

  describe("Cuando un usuario reserva una bici", () => {
    it("Debe exitir la reserva ", (done) => {
      const usuario = new Usuario({ nombre: "Federico" });
      usuario.save();
      const bicicleta = new Bicicleta({
        code: 1,
        color: "Rojo",
        modelo: "Urbana",
      });
      bicicleta.save();
      var hoy = new Date();
      var mañana = new Date();
      mañana.setDate(hoy.getDate() + 1);
      usuario.reservar(bicicleta.id, hoy, mañana, function (err, reserva) {
        Reserva.find({})
          .populate("bicicleta")
          .populate("usuario")
          .exec(function (err, reservas) {
            console.log(reservas[0]);
            expect(reservas.length).toBe(1);
            expect(reservas[0].diasDeReserva()).toBe(2);
            expect(reservas[0].bicicleta.code).toBe(1);
            expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
            done();
          });
      });
    });
  });
});
