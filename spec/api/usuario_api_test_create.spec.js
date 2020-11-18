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

  describe("Crear usuario /create\n", () => {
    it("Status 200", (done) => {
      Usuario.allUsuarios(function (err, usuarios) {
        console.log("---- Verifico Usuarios empty  ---- ");
        console.log("---- Usuarios en el sistema: " + usuarios.length);
        expect(usuarios.length).toEqual(0);
        var headers = { "Content-type": "application/json" };
        var usuarioNuevo = '{"nombre": "Gabriel"}';
        request.post(
          {
            headers: headers,
            url: api_url + "usuarios/create",
            body: usuarioNuevo,
          },
          function (error, response, body) {
            expect(response.statusCode).toBe(200);

            var result = JSON.parse(response.body).usuario;
            expect(result.nombre).toBe("Gabriel");
            Usuario.allUsuarios(function (err, usuarios) {
              console.log("---- Usuario Agregado--------------");
              console.log("{");
              console.log("     nombre: " + result.nombre);
              console.log("}");
              expect(usuarios.length).toEqual(1);
              done();
            });
          },
          250
        );
      });
    });
  });
});
