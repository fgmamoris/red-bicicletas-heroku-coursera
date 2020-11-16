var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");

var urlDB = "mongodb://localhost/testdb";

var api_url = "http://localhost:3000/api/bicicletas";

describe("Testing Bicicletas API", function () {
  // beforeAll((done) => {
  //   mongoose.connection.close(done);
  // });
  //Soluciona el error de multiples conexiones a mongo
  //Tambien se puede poner en el beforeEach()
  /*********
   * Ojo no poner en el afterEach() ya que si no se corre el test, la conexion no se cierra, solo poner
   * afterEach cuando los test pasan
   */

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

  // beforeAll((done) => {

  //   mongoose.connection.close(done);
  // });
  // beforeEach(function (done) {
  //   var mongoDB = "mongodb://localhost/testdb";
  //   mongoose.connect(mongoDB, {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //     // useCreateIndex: true,
  //   });
  //   const db = mongoose.connection;
  //   db.on("error", console.error.bind(console, "Mongo DB connection error: "));
  //   db.once("open", function () {
  //     console.log("We are connected to test database");
  //     done();
  //   });
  // });
  // afterEach(function (done) {
  //   Bicicleta.deleteMany({}, function (err, success) {
  //     if (err) console.log(err);
  //     // mongoose.disconnect(err);
  //     done();
  //   });
  // })
  // describe(" Get BICICLETAS bicicletas/\n", () => {
  //   it("Status 200", (done) => {
  //     request.get(
  //       api_url,
  //       function (error, response, body) {
  //         var result = JSON.parse(body);
  //         console.log(result);
  //         expect(response.statusCode).toBe(200);
  //         expect(result.bicicletas.length).toBe(0);
  //         done();
  //       },
  //       250
  //     );
  //   });
  // });
  // describe(" POST BICICLETAS /create\n", () => {
  //   it("Status 200", (done) => {
  //     var headers = { "content-type": "application/json" };
  //     var abici =
  //       '{ "code":10,"color":"Verde","modelo":"Urbana","lat": 10.975832,"lng": -74.808815 }';
  //     request.post(
  //       {
  //         headers: headers,
  //         url: "http://localhost:3000/api/bicicletas/create",
  //         body: abici,
  //       },
  //       function (error, response, body) {
  //         console.log(response.statusCode);
  //         console.log(response.statusMessage);
  //         console.log(body);
  //         expect(response.statusCode).toBe(200);
  //         expect(Bicicleta.findByCode(10).color).toBe(abici.color);
  //         done();
  //       },
  //       250
  //     );
  //   });
  // });

  describe("Update Bicicleta /update", () => {
    it("Status 200", (done) => {
      expect(Bicicleta.allBicis.length).toBe(1);
      var bici = new Bicicleta({
        code: 1,
        color: "negra",
        modelo: "urbana",
        ubicacion: [-34.6012424, -58.3861497],
      });
      console.log(bici);
      // var a = new Bicicleta(1, "negra", "urbana", [-34.6012424, -58.3861497]);
      // console.log(a);
      Bicicleta.add(bici);
      expect(Bicicleta.allBicis.length).toBe(1);
      var headers = { "content-type": "application/json" };
      var aBici =
        '{"code": 1, "color": "rojo", "modelo": "urbana", "lat": -34; "lng": -34}';
      request.patch(
        {
          headers: headers,
          url: "http://localhost:3000/api/bicicletas/update",
          body: aBici,
        },
        function (error, response, body) {
          
          expect(response.statusCode).toBe(200);
          expect(Bicicleta.findByCode(1).color).toBe(aBici.color);
          done();
        }
      );
    });
  });
});

/*  SIN USUARIOS Y RESERVAS
describe("Bicicleta API\n", () => {
  describe("Get Bicicletas\n", () => {
    it("Status 200", () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var a = new Bicicleta(1, "Verde", "Montaña", [-41.134889, -71.305974]);
      Bicicleta.add(a);
      request.get("http://localhost:3000/api/bicicletas", function (
        error,
        response,
        body
      ) {
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Post Bicicletas\n", () => {
    it("Status 200", (done) => {
      var header = { "Content-type": "application/json" };
      var aBici =
        '{"id":10 , "color": "rojo", "modelo": "urbana", "lat": 34, "lng": -54}';
      request.post(
        {
          headers: header,
          url: "http://localhost:3000/api/bicicletas/create",
          body: aBici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
          expect(Bicicleta.findById(10).color).toBe("rojo");
          done();
        }
      );
    });

    describe("Update Bicicletas\n", () => {
      it("Status 200", (done) => {
        var header = { "Content-type": "application/json" };
        var aBici =
          '{"id":10 , "color": "blanco", "modelo": "urbana", "lat": 34, "lng": -54}';
        request.patch(
          {
            headers: header,
            url: "http://localhost:3000/api/bicicletas/update",
            body: aBici,
          },
          function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(10).color).toBe("blanco");
            done();
          }
        );
      });
    });
  });

  describe("Delete Bicicletas\n", () => {
    it("Status 204", (done) => {
      var header = { "Content-type": "application/json" };
      var aBici =
        '{"id":10 }';
      request.delete(
        {
          headers: header,
          url: "http://localhost:3000/api/bicicletas/delete",
          body: aBici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(204);
          expect( function(){Bicicleta.findById(10) } ).toThrow(new Error('No existe bicicleta con id: 10'));
          done();
        }
      );
    });
  });
  
*/
//});
