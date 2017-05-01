import { typeOf } from "./typeOf";

const samples: [[string, any]] = [
  ["undefined", undefined],
  ["boolean", true],
  ["string", '""'],
  ["function", () => null],
  ["array", []],
  ["object", {}],
  ["null", null],
  ["number", 0],
  ["number", Infinity],
  ["date", new Date()],
  ["regexp", /a/],
  ["nan", NaN],
];

const typeKeys = [
  "Undefined",
  "Boolean",
  "String",
  "Function",
  "Array",
  "Object",
  "Null",
  "Number",
  "Date",
  "RegExp",
  "NaN",
];

samples.forEach((sample, index) => {
  const fnKey = sample[0];
  const value = sample[1];

  it(`${index} typeOf.${fnKey}`, (test) => {
    expect(typeOf(value) === fnKey).toBe(true);

    const upperKey = typeKeys.filter((k) => {
      return k.toLowerCase() === fnKey;
    })[0];

    expect((typeOf[fnKey](value))).toBe(true);
    expect((typeOf[upperKey](value))).toBe(true);
  });
});
