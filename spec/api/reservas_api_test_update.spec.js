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

  describe("Update Reserva /usuarios/reservas/update\n", () => {
    it("Status 200", (done) => {
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
              Reserva.findByUsuarioAndBici(
                userAdd.id,
                bicicletaReturn.id,
                function (err, reserva) {
                  console.log(
                    "---- Verifico que la reserva este incorporada al sistema  ---- "
                  );
                  console.log("---- Reserva agregada--------------");
                  console.log("{");
                  console.log(reserva);
                  console.log("}");
                  console.log("---- Reserva agregada--------------");
                  var desde = "2020-08-10";
                  var hasta = "2020-08-20";
                  var headers = { "Content-type": "application/json" };
                  var uReserva =
                    '{"usuario": "' +
                    userAdd.id +
                    '",' +
                    '"bicicleta": "' +
                    bicicletaReturn.id +
                    '",' +
                    '"desde":' +
                    '"' +
                    desde +
                    '"' +
                    "," +
                    '"hasta":' +
                    '"' +
                    hasta +
                    '"' +
                    "}";
                  request.patch(
                    {
                      headers: headers,
                      url: api_url + "usuarios/reservas/update",
                      body: uReserva,
                    },
                    function (error, response, body) {
                      expect(response.statusCode).toBe(200);
                      Reserva.allReservas((err, reservas) => {
                        console.log("---- Verifico reserva modificada ---- ");
                        console.log(
                          "---- Reservas en el sistema: " + reservas.length
                        );
                        var result = JSON.parse(body).reserva;
                        console.log(result);
                        expect(reservas.length).toBe(1);
                        expect(result.bicicleta).toBe(bicicletaReturn.id);
                        expect(result.usuario).toBe(userAdd.id);
                        expect(result.desde).toBe("2020-08-10T00:00:00.000Z");
                        expect(result.hasta).toBe("2020-08-20T00:00:00.000Z");
                        console.log(response.statusCode);
                        console.log("---- FIN Update Reserva ----");
                        done();
                      });
                    }
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});
