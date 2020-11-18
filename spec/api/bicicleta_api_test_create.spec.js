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

  describe(" POST BICICLETAS /create\n", () => {
    it("Status 200", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        console.log("---- Verifico Bicis empty  ---- ");
        console.log("---- Bicis en el sistema: " + bicis.length);
        expect(bicis.length).toEqual(0);
        var headers = { "content-type": "application/json" };
        var abici =
          '{ "code":10,"color":"Verde","modelo":"Urbana","lat": 10.975832,"lng": -74.808815 }';
        request.post(
          {
            headers: headers,
            url: api_url + "bicicletas/create",
            body: abici,
          },
          function (error, response, body) {
            expect(response.statusCode).toBe(200);
            var bici = JSON.parse(body).bicicleta;
            Bicicleta.allBicis(function (err, bicis) {
              console.log(
                "---- Verifico que la bici este en el sistema  ---- "
              );
              console.log("---- Bicis agregada--------------");
              console.log("{");
              console.log("     code: " + bici.code);
              console.log("     color: " + bici.color);
              console.log("     modelo: " + bici.modelo);
              console.log("     latitud: " + bici.ubicacion[0]);
              console.log("     longitud: " + bici.ubicacion[1]);
              console.log("}");
              console.log("---- Fin Create Bicicleta ----");
              expect(bici.color).toBe("Verde");
              expect(bici.ubicacion[0]).toBe(10.975832);
              expect(bici.ubicacion[1]).toBe(-74.808815);
              expect(bicis.length).toEqual(1);
              done();
            });
          },
          250
        );
      });
    });
  });
});
