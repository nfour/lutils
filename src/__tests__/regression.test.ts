// tslint:disable:no-console
import * as oldClone from 'lutils-clone'
import * as oldMerge from 'lutils-merge'
import * as oldTypeOf from 'lutils-typeof'
import { clone } from '../clone'
import { merge } from '../merge'
import { typeOf } from '../typeOf'
import { benchmark, evaluateBenchmark } from './utils';

describe('regression benchmark', () => {

  const payload = {
    a: { b: { c: {
      d: 1,
      x: [
        1,
        { a: { b: [[[]]] } },
      ],
    } } },
  }

  it('typeOf is faster', () => {
    const old = benchmark(500, () => {
      oldTypeOf('str')
      oldTypeOf({})
      oldTypeOf(NaN)
      oldTypeOf.String(1)
      oldTypeOf.Array([])
      oldTypeOf.Function(1)
    })

    const current = benchmark(500, () => {
      typeOf('str')
      typeOf({})
      typeOf(NaN)
      typeOf.isString(1)
      typeOf.isArray([])
      typeOf.isFunction(1)
    })

    const percentDiff = evaluateBenchmark(old, current, 20)

    console.dir(`typeOf: ${old} -> ${current} -> %${percentDiff}`)
  })

  it('merge is on par', () => {
    const old = benchmark(500, () => {
      oldMerge(payload, payload)
      oldMerge(payload, payload, payload)
      oldMerge(payload, payload, payload, payload)
      oldMerge({}, {}, {}, {})
    })

    const current = benchmark(500, () => {
      merge(payload, payload)
      merge(payload, payload, payload)
      merge(payload, payload, payload, payload)
      merge({}, {}, {}, {})
    })

    const percentDiff = evaluateBenchmark(old, current, -20)

    console.dir(`merge: ${old} -> ${current} -> %${percentDiff}`)
  })

  it('clone is on par', () => {
    const old = benchmark(500, () => {
      oldClone(payload)
      oldClone({})
    })

    const current = benchmark(500, () => {
      clone(payload)
      clone({})
    })

    const percentDiff = evaluateBenchmark(old, current, -40)

    console.dir(`clone: ${old} -> ${current} -> %${percentDiff}`)
  })
})
