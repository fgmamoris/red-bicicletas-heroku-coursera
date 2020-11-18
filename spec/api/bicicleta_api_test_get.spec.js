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

  describe(" Get BICICLETAS bicicletas/\n", () => {
    it("Status 200", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        console.log("---- Sin bicis en el sistema inicial: " + bicis.length);
        expect(bicis.length).toEqual(0);
        request.get(
          api_url + "bicicletas",
          function (error, response, body) {
            var result = JSON.parse(body).bicicletas;
            expect(response.statusCode).toBe(200);
            expect(result.length).toBe(0);
            console.log("---- Peticion Get ----");
            console.log(" Resultado: ");
            console.log(result);
            console.log("---- Fin Get Bicicleta ----");
            done();
          },
          250
        );
      });
    });
  });
});
