var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");
var Reserva = require("../../models/reserva");
const Usuario = require("../../models/usuario");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/";

describe("Testing Reservas API", function () {
  beforeAll(function (done) {
    mongoose.connection.close().then(() => {
      var mongoDB = "mongodb://localhost/testdb";
      mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.set("useCreateIndex", true);
      var db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB connection error: "));
      db.once("open", function () {
        console.log("We are connected to test database!");
        done();
      });
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

  describe("Remove Reserva /usuarios/reservas/update\n", () => {
    it("Status 204", (done) => {
      Reserva.allReservas(function (err, reservas) {
        if (err) console.log(err);
        console.log("---- Verifico Reservas empty  ---- ");
        console.log("---- Reservas en el sistema: " + reservas.length);
        expect(reservas.length).toEqual(0);
        const user = new Usuario({ nombre: "Federico" });
        Usuario.add(user, function (err, userAdd) {
          if (err) console.log(err);
          const bici = new Bicicleta({
            code: 1,
            color: "Rojo",
            modelo: "Urbana",
          });
          Bicicleta.add(bici, function (err, bicicletaReturn) {
            if (err) console.log(err);
            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            userAdd.reservar(bicicletaReturn.id, hoy, mañana, function (err) {
              Reserva.allReservas((err, reservas) => {
                console.log("---- Verifico reserva agregada ---- ");
                console.log("---- Reservas en el sistema: " + reservas.length);
                var headers = { "Content-type": "application/json" };
                var dReserva =
                  '{"usuario": "' +
                  userAdd.id +
                  '",' +
                  '"bicicleta": "' +
                  bicicletaReturn.id +
                  '"}';
                console.log(dReserva);
                request.delete(
                  {
                    headers: headers,
                    url: api_url + "usuarios/reservas/delete",
                    body: dReserva,
                  },
                  function (error, response, body) {
                    expect(response.statusCode).toBe(204);
                    Reserva.allReservas((err, reservas) => {
                      console.log("---- Verifico reserva eliminada ---- ");
                      console.log(
                        "---- Reservas en el sistema: " + reservas.length
                      );
                      expect(reservas.length).toBe(0);
                      expect(response.statusCode).toBe(204);
                      console.log(response.statusCode);
                      console.log("---- FIN Update Reserva ----");
                      done();
                    });
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});
