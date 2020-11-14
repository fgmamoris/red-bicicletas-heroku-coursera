var Bicicleta = require("../../models/bicicleta");

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
      Bicicleta.removeById(1);
      expect( function(){Bicicleta.findById(1) } ).toThrow(new Error('No existe bicicleta con id: 1'));
      
    });
  });