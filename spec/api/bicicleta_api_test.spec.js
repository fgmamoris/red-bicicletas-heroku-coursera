var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");

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

});
