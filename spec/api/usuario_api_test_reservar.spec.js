var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");
var Reserva = require("../../models/reserva");
const Usuario = require("../../models/usuario");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/";

describe("Testing Usuarios/Reservar API", function () {
  beforeAll((done) => {
    mongoose.connection.close(done);
  });

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

  describe("Crear Reserva /reservar\n", () => {
    it("Status 200", (done) => {
      Usuario.allUsuarios((err, usuarios) => {
        console.log("---- Crear Reserva API ----");
        console.log("---- Verifico Usuarios empty  ---- ");
        console.log("---- Usuarios en el sistema: " + usuarios.length);
        expect(usuarios.length).toBe(0);
        Bicicleta.allBicis((err, bicicletas) => {
          console.log("---- Verifico Bicis empty  ---- ");
          console.log("---- Bicicletas en el sistema: " + bicicletas.length);
          expect(bicicletas.length).toBe(0);
          Reserva.allReservas((err, reservas) => {
            console.log("---- Verifico Reservas empty  ---- ");
            console.log("---- Reservas en el sistema: " + reservas.length);
            expect(reservas.length).toBe(0);
            const usuario = new Usuario({ nombre: "Federico" });
            usuario.save();
            const bicicleta = new Bicicleta({
              code: 1,
              color: "Rojo",
              modelo: "Urbana",
            });
            bicicleta.save();
            var headers = { "Content-type": "application/json" };
            var reserva =
              '{"id": "' +
              usuario.id +
              '",' +
              '"bici_id": "' +
              bicicleta.id +
              '",' +
              '"desde": "2020-11-19", "hasta": "2020-11-20"}';
            console.log(reserva);
            request.post(
              {
                headers: headers,
                url: api_url + "usuarios/reservar",
                body: reserva,
              },
              function (error, response, body) {
                expect(response.statusCode).toBe(200);
                console.log(response.statusCode);

                // const result = JSON.parse(body).reserva;
                Reserva.allReservas((err, reservas) => {
                  console.log("---- Verifico reserva creada ---- ");
                  console.log(
                    "---- Reservas en el sistema: " + reservas.length
                  );

                  expect(reservas.length).toBe(1);
                  var result = JSON.parse(body).reserva;
                  expect(result.usuario).toBe(usuario.id);
                  expect(result.bicicleta).toBe(bicicleta.id);
                  console.log("---- FIN Crear Reserva ----");
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
