var Bicicleta = require("../../models/bicicleta");
var mongoose = require("mongoose");

var urlDB = "mongodb://localhost/testdb";
describe("Testing Bicicletas", function () {
  beforeEach(function (done) {
    var mongoDB = urlDB;
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Mongo DB connection error: "));
    db.once("open", function () {
      console.log("We are connected to test database");
      done();
    });
  });

  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log;
      mongoose.disconnect(err);
      done();
    });
  });

  describe("Bicicleta.createInstance", () => {
    it("Crea una instancia de bicicleta", () => {
      var bici = Bicicleta.createInstance(1, "verde", "urbana", [2323, 2323]);
      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toBe(2323);
      expect(bici.ubicacion[1]).toBe(2323);
    });
  });
  describe("Bicicleta.allBicis", () => {
    it("Inicia vacia", (done) => {
      //Le paso un callback con un error y la lista de bicicletas
      Bicicleta.allBicis(function (err, bicis) {
        console.log(bicis);
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe("Bicicleta.add", () => {
    it("Agrego una bici a la bd", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "Rojo", modelo: "montaña" });
      //LLamo al metodo estatico del modelo Bicicleta
      Bicicleta.add(aBici, function (err, newBici) {
        if (err) console.log(err);
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toEqual(1);
          //expect(bicis.length).toBe(1);
          expect(bicis[0].code).toEqual(1);
          done();
        });
      });
    });
  });

  describe("Bicicleta.findByCode", () => {
    it("Busco el primer elemento en la base de datos", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);
        var aBici = new Bicicleta({
          code: 1,
          color: "Rojo",
          modelo: "montaña",
        });
        Bicicleta.add(aBici, function (err, newBici) {
          if (err) console.log(err);
          var aBici2 = new Bicicleta({
            code: 2,
            color: "Azul",
            modelo: "Urbana",
          });
          Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);
            Bicicleta.findByCode(1, function (err, targetBici) {
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);
              done();
            });
          });
        });
      });
    });
  });

  describe("RemoveByCode", () => {
    it("Remueve una bici a la bd", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "Rojo", modelo: "montaña" });
      //LLamo al metodo estatico del modelo Bicicleta
      Bicicleta.add(aBici, function (err, newBici) {
        if (err) console.log(err);
        var aBici2 = new Bicicleta({
          code: 2,
          color: "Azul",
          modelo: "Urbana",
        });
        Bicicleta.add(aBici2, function (err) {
          if (err) console.log(err);
          Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toEqual(2);
            Bicicleta.deleteByCode(1, function (err) {
              if (err) console.log(err);
              Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toEqual(1);
                //expect(bicis.length).toBe(1);
                expect(bicis[0].code).toEqual(aBici2.code);
                expect(bicis[0].color).toEqual(aBici2.color);
                expect(bicis[0].modelo).toEqual(aBici2.modelo);
                done();
              });
            });
          });
        });
      });
    });
  });
});

//   describe("Update", () => {
//     it("Agrego una bici a la bd", (done) => {
//       var aBici = new Bicicleta({ code: 1, color: "Rojo", modelo: "montaña" });
//       //LLamo al metodo estatico del modelo Bicicleta
//       Bicicleta.add(aBici, function (err, newBici) {
//         if (err) console.log(err);
//         Bicicleta.allBicis(function (err, bicis) {
//           expect(bicis.length).toEqual(1);
//           //expect(bicis.length).toBe(1);
//           expect(bicis[0].code).toEqual(1);
//           done();
//         });
//       });
//     });
//   });

//   describe("UpdateOne", () => {
//     it("Actualizo una bicicleta de la BBDD", (done) => {
//       var aBici = new Bicicleta({
//         code: 1,
//         color: "Rojo",
//         modelo: "montaña",
//       });
//       //LLamo al metodo estatico del modelo Bicicleta
//       Bicicleta.add(aBici, function (err, newBici) {
//         if (err) console.log(err);
//         Bicicleta.allBicis(function (err, bicis) {
//           expect(bicis.length).toEqual(0);
//           //expect(bicis.length).toBe(1);
//           expect(bicis[0].code).toEqual(1);
//           done();
//         });
//       });
//       aBici.color = "Azul";
//       Bicicleta.update(aBici, function (err, newBici) {
//         if (err) console.log(err);
//         expect(newBici.color).toBe("Azul");
//         done();
//       });
//     });
//   });
// });

/*
SIN BBDD
beforeEach(()=>{
Bicicleta.allBicis=[];
});
describe("Propiedad Bicicleta.allBicis empty\n", () => {
  it("Comienza vacia", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe("Agregar una bicicleta", () => {
  it("Agregar bici", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var a = new Bicicleta(1, "blanca", "ubarna", [-41.134889, -71.305974]);

    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

describe("Bicicleta findBiId", () => {
  it("Devolver bici con id 1", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var a = new Bicicleta(1, "Verde", "Montaña", [-41.134889, -71.305974]);
    var b = new Bicicleta(2, "Roja", "Urbana", [-41.134889, -71.305974]);
    Bicicleta.add(a);
    Bicicleta.add(b);
    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe('Verde');
    expect(targetBici.modelo).toBe('Montaña');
  });
});

describe("Bicicleta remove", () => {
    it("Remove de la lista la bici con id 1", () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var a = new Bicicleta(1, "Verde", "Montaña", [-41.134889, -71.305974]);
      var b = new Bicicleta(2, "Roja", "Urbana", [-41.134889, -71.305974]);
      Bicicleta.add(a);
      Bicicleta.add(b);
      Bicicleta.removeById(1);gi
      expect( function(){Bicicleta.findById(1) } ).toThrow(new Error('No existe bicicleta con id: 1'));
      
    });
});*/
