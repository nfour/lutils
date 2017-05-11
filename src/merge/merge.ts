import { typeOf } from '../typeOf'

export interface IObject { [key: string]: any }

export type IMergeTest = (params: {
  merge: Merge,
  obj1: object, obj2: object,
  isTraversal: boolean,
  key: string,
}) => boolean

const tests: { [key: string]: IMergeTest } = {
  merge({ isTraversal, obj1, key }) {
    return !isTraversal || key in obj1
  },
  white({ isTraversal, key, obj2 }) {
    return isTraversal || key in obj2
  },
  black({ isTraversal, key, obj1 }) {
    return isTraversal || !(key in obj1)
  },
}

export interface IMerge {
  <T, S1, S2, S3, S4>(t: T, s1: S1, s2: S2, s3: S3, s4: S4): S4 & S3 & S2 & S1 & T
  <T, S1, S2, S3>(t: T, s1: S1, s2: S2, s3: S3): S3 & S2 & S1 & T
  <T, S1, S2>(t: T, s1: S1, s2: S2): S2 & S1 & T
  <T, S1>(t: T, s1: S1): S1 & T
}

export class Merge {
  public depth = 10
  public types = { object: true, array: true, function: false }
  public test: IMergeTest = tests.merge
  public traverseTargetKeys = false
  private alwaysPass: boolean
  private usingDefaultDepth = true

  constructor(options?: {
    depth?: number
    types?: { object: boolean, array: boolean, function: boolean }
    test?: IMergeTest
    traverseTargetKeys?: boolean,
  }) {
    if (options) {
      Object.assign(this, options)

      // Used to emit warnings
      this.usingDefaultDepth = !('depth' in options)
    }

    // If there is no test, always pass
    this.alwaysPass = !this.test
  }

  public merge: IMerge = (target, ...sources) => {
    const len = sources.length

    for (let i = 0; i < len; ++i) {
      this.traverse(target, sources[i], this.depth)
    }

    return target
  }

  private traverse(obj1: IObject, obj2: IObject, depth: number): IObject {
    if (--depth < 0) {
      this.depthWarning()
      return obj1
    }

    const target = this.traverseTargetKeys ? obj1 : obj2

    Object.keys(target).forEach((key) => {
      const nextObj1 = obj1[key]
      const nextObj2 = obj2[key]

      const obj1Type = typeOf(nextObj1)
      const obj2Type = typeOf(nextObj2)

      const isTraversal = this.types[obj2Type] && this.types[obj1Type]

      const isPassing = this.alwaysPass || this.test({
        merge: this, key,
        obj1, obj2, isTraversal,
      })

      if (!isPassing) { return }

      if (isTraversal) {
        this.traverse(nextObj1, nextObj2, depth)
      } else {
        obj1[key] = obj2[key]
      }
    })
  }

  private depthWarning() {
    if (this.usingDefaultDepth) {
      console.warn(`[WARNING merge] default depth of ${this.depth} reached. Be explicit, set this manually`)
    }
  }
}

export const mergeBlack = new Merge({
  test: tests.black,
}).merge

export const mergeWhite = new Merge({
  test: tests.white,
  traverseTargetKeys: true,
}).merge as <T>(target: T, ...s: object[]) => T

export const merge = Object.assign(
  new Merge().merge,
  {
    black: mergeBlack,
    white: mergeWhite,
  },
)

export default merge
