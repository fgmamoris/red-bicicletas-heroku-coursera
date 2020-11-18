var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/";

describe("Testing Bicicletas API", function () {
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
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      //mongoose.disconnect(err); ORIGINAL
      mongoose.disconnect(done);
      done();
    });
  });

  describe("Update Bicicleta /update\n", () => {
    it("Status 200", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        if (err) console.log(err);
        console.log("---- Verifico Bicis empty  ---- ");
        console.log("---- Bicis inicial en el sistema: " + bicis.length);
        expect(bicis.length).toEqual(0);
        var bici = new Bicicleta({
          code: 12,
          color: "Negra",
          modelo: "Urbana",
          ubicacion: [-34.6012424, -58.3861497],
        });
        Bicicleta.add(bici, function (err) {
          if (err) console.log(err);
          Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toEqual(1);
            console.log("---- Verifico que la bici este en el sistema  ---- ");
            console.log("---- Bicis agregada--------------");
            console.log("{");
            console.log("     code: " + bici.code);
            console.log("     color: " + bici.color);
            console.log("     modelo: " + bici.modelo);
            console.log("     latitud: " + bici.ubicacion[0]);
            console.log("     longitud: " + bici.ubicacion[1]);
            console.log("}");
            var headers = { "content-type": "application/json" };
            var aBici =
              '{"code": 12, "color": "Rojo", "modelo": "Montaña", "lat": -34, "lng": -34}';
            request.patch(
              {
                headers: headers,
                url: api_url + "bicicletas/update",
                body: aBici,
              },
              function (error, response, body) {
                expect(response.statusCode).toBe(200);
                const result = JSON.parse(body).bicicleta;
                // console.log(result);
                console.log(response.statusCode);
                Bicicleta.allBicis(function (err, bicis) {
                  expect(bicis.length).toBe(1);
                  expect(result.code).toBe(12);
                  expect(result.color).toBe("Rojo");
                  expect(result.modelo).toBe("Montaña");
                  expect(result.ubicacion[0]).toBe(-34);
                  expect(result.ubicacion[1]).toBe(-34);
                  console.log("---- Bicis modificada: " + bicis.length);
                  console.log("{");
                  console.log("     code: " + bicis[0].code);
                  console.log("     color: " + bicis[0].color);
                  console.log("     modelo: " + bicis[0].modelo);
                  console.log("     latitud: " + bicis[0].ubicacion[0]);
                  console.log("     longitud: " + bicis[0].ubicacion[1]);
                  console.log("}");
                  console.log("---- Fin Modificar Bicicleta ----");
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
