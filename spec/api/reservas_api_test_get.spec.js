var Reserva = require("../../models/reserva");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");

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

  describe(" Get Reservas /\n", () => {
    it("Status 200", (done) => {
      Reserva.allReservas(function (err, reservas) {
        console.log(
          "---- Sin reservas en el sistema inicial: " + reservas.length
        );
        expect(reservas.length).toEqual(0);
        request.get(
          api_url + "usuarios/reservas",
          function (error, response, body) {
            var result = JSON.parse(body).reservas;
            expect(response.statusCode).toBe(200);
            expect(result.length).toBe(0);
            console.log("---- Peticion Get ----");
            console.log(" Resultado: ");
            console.log(result);
            console.log("---- Fin Get Reservas ----");
            done();
          },
          250
        );
      });
    });
  });
});
