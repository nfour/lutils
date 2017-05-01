export function typeOf(value) {
  const type = Object.prototype.toString.call(value)
    .slice(8, -1)
    .toLowerCase();

  if (type === "number" && isNaN(value)) { return "nan"; }

  return type;
}

export default typeOf;

[
  "Undefined",
  "Boolean",
  "String",
  "Function",
  "AsyncFunction",
  "Array",
  "Object",
  "Null",
  "Number",
  "Date",
  "RegExp",
  "NaN",
].forEach((key) => {
  const lowerKey = key.toLowerCase();
  const fn = (value) => typeOf(value) === lowerKey;

  typeOf[lowerKey] = fn;
  typeOf[key] = fn;
});
