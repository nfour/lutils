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
    // tslint:disable-next-line:trailing-comma
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
        expect(typeOf(value)).toBe(type)
        expect((typeOf[fnKey](value))).toBe(true)
      })

      badValues.forEach((value) => {
        expect(typeOf(value)).not.toBe(type)
        expect((typeOf[fnKey](value))).toBe(false)

        samples.forEach((counterSample) => {
          if (counterSample[0] === fnKey) { return }

          const counterValues: any = counterSample[2]

          counterValues.forEach((counterValue) => {
            expect(typeOf(counterValue)).not.toBe(type)
            expect((typeOf[fnKey](counterValue))).toBe(false)
          })
        })
      })
    })
  })
})
