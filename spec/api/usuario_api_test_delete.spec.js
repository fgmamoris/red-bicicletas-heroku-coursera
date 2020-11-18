var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");
var Reserva = require("../../models/reserva");
const Usuario = require("../../models/usuario");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/";

describe("Testing Usuarios API", function () {
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

  describe("Delete usuario /delete\n", () => {
    it("Status 204", (done) => {
      Usuario.allUsuarios(function (err, usuarios) {
        if (err) console.log(err);
        console.log("---- Verifico Usuarios empty  ---- ");
        console.log("---- Usuarios en el sistema: " + usuarios.length);
        expect(usuarios.length).toEqual(0);
        var user = new Usuario({ nombre: "Federico" });
        Usuario.add(user, function (err) {
          if (err) console.log(err);
          Usuario.allUsuarios(function (err, usuarios) {
            console.log(
              "---- Verifico que el usuario este incorporado al sistema  ---- "
            );
            console.log("---- Usuario en el sistema: " + usuarios.length);
            console.log("---- Usuario agregado--------------");
            console.log("{");
            console.log("     nombre: " + usuarios[0].nombre);
            console.log("}");
            expect(usuarios.length).toEqual(1);
            var headers = { "Content-type": "application/json" };
            var nombre = '{"nombre": "Federico"}';
            request.delete(
              {
                headers: headers,
                url: api_url + "usuarios/delete_usuario",
                body: nombre,
              },
              function (error, response, body) {
                console.log(response.statusCode);

                expect(response.statusCode).toBe(204);
                Usuario.allUsuarios(function (err, usuarios) {
                  expect(usuarios.length).toBe(0);
                  console.log(
                    "---- Usuarios en el sistema: " + usuarios.length
                  );
                  console.log("---- Fin Eliminar usuario ----");
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
