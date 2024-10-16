const calculadora = require("../models/calculadora.js");

/* TESTE DE TESTE
test("Espero que 2 seja 2", () => {
  expect(1).toBe(2);
});
*/
test("Somar 1 + null resultado 1", () => {
  const resultado = calculadora.somar(1, null);
  console.log(resultado);
  expect(resultado).toBe(1);
});

test("Somar 1 + 1 resultado 2", () => {
  const resultado = calculadora.somar(1, 2);
  expect(resultado).toBe(2);
});
