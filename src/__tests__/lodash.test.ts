import { cloneDeep } from 'lodash'
import { Clone } from '../clone'
import { benchmark, evaluateBenchmark } from './utils'

const clone = new Clone({ depth: 100 }).clone

describe('lodash performance comparison', () => {
  it('lutils clone is slower than lodash', () => {
    const payload = {
      a: { b: { c: {
        d: 1,
        x: [
          1,
          { a: { b: [[[]]] } },
        ],
      } } },
      a2: { b: { c: {
        d: 1,
        x: [
          1,
          { a: { b: [[[]]] } },
        ],
      } } },
    }

    const lo = benchmark(500, () => {
      cloneDeep(payload)
    })

    const lu = benchmark(500, () => {
      clone(payload)
    })

    const percentDiff = evaluateBenchmark(lo, lu, -50)

    console.dir(`lodash clone to lutils clone: ${lu} -> ${lo} -> %${percentDiff}`)
  })
})
