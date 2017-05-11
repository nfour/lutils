import { typeOf } from './typeOf'

const samples = [
  [
    'isBoolean', 'boolean',
    [true], [null],
  ],
  [
    'isNull', 'null',
    [null], [false],
  ],
  [
    'isUndefined', 'undefined',
    [undefined], [null],
  ],
  [
    'isString', 'string',
    ['a'], [null],
  ],
  [
    'isNumber', 'number',
    [4, Infinity], [null, NaN],
  ],
  [
    'isSymbol', 'symbol',
    [Symbol('')], [null],
  ],
  [
    'isFunction', 'function',
    [() => 1, async () => 1], [null],
  ],
  [
    'isArray', 'array',
    [[]], [null],
  ],
  [
    'isObject', 'object',
    [{}], [null],
  ],
  [
    'isRegExp', 'regexp',
    [new RegExp('')], [null],
  ],
  [
    'isDate', 'date',
    [new Date()], [null],
  ],
]

describe('typeOf', () => {
  samples.forEach(([fnKey, type, goodValues, badValues]: [string, string, any[], any[]]) => {
    it(`typeOf.${fnKey}`, () => {
      goodValues.forEach((value) => {
        expect(typeOf(value) === type).toBe(true)
        expect((typeOf[fnKey](value))).toBe(true)
      })

      badValues.forEach((value) => {
        expect(typeOf(value) === type).toBe(false)
        expect((typeOf[fnKey](value))).toBe(false)
      })
    })
  })
})
