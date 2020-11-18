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

  describe("Delete Bicicleta By Code /delete\n", () => {
    it("Status 204", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        if (err) console.log(err);
        console.log("---- Verifico Bicis empty  ---- ");
        console.log("---- Bicis en el sistema: " + bicis.length);
        expect(bicis.length).toEqual(0);
        var bici = new Bicicleta({
          code: 12,
          color: "negra",
          modelo: "urbana",
          ubicacion: [-34.6012424, -58.3861497],
        });
        Bicicleta.add(bici, function (err) {
          if (err) console.log(err);
          Bicicleta.allBicis(function (err, bicis) {
            console.log("---- Verifico que la bici este en el sistema  ---- ");
            console.log("---- Bicis en el sistema: " + bicis.length);
            console.log("---- Bicis agregada--------------");
            console.log("{");
            console.log("     code: " + bicis[0].code);
            console.log("     color: " + bicis[0].color);
            console.log("     modelo: " + bicis[0].modelo);
            console.log("     latitud: " + bicis[0].ubicacion[0]);
            console.log("     longitud: " + bicis[0].ubicacion[1]);
            console.log("}");
            expect(bicis.length).toEqual(1);
            var headers = { "Content-type": "application/json" };
            var code = '{"code": 12}';
            request.delete(
              {
                headers: headers,
                url: api_url+ "bicicletas/delete",
                body: code,
              },
              function (error, response, body) {
                console.log(response.statusCode);
                expect(response.statusCode).toBe(204);
                Bicicleta.allBicis(function (err, bicis) {
                  expect(bicis.length).toBe(0);
                  console.log("---- Bicis en el sistema: " + bicis.length);
                  console.log("---- Fin Eliminar Bicicleta ----");
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
