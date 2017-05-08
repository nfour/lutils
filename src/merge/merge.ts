import { typeOf } from "../lutils-typeOf"

export type ITargetObject = object

export interface IMerge {
  (targetObject: ITargetObject, ...objects: object[]): ITargetObject

  white?()
  black?()
}

export interface IMergeOptions {
  depth?: number
  types?: { [key: string]: boolean }
  tests?: Array<() => null>
  iterateTarget?: boolean
}

export type ITestFn = (params: any) => boolean

const tests = {
  merge(params) {
    if (params.assigning) { return true }

    return params.key in params.obj1
  },
  white(params) {
    if (params.recursing) { return true }

    return params.key in params.obj2
  },
  black(params) {
    if (params.recursing) { return true }

    return ! (params.key in params.obj1)
  },
}

export class Merge {
  public depth = 8
  public types = { object: true, array: true }
  public tests: ITestFn[] = [tests.merge]
  public iterateTarget = false

  constructor(options?: IMergeOptions) {
    if (options) { Object.assign(this, options) }
  }

  public merge = (target: ITargetObject, ...objects: object[]): ITargetObject => {
    const len = objects.length

    for (let i = 0; i < len; ++i) {
      this.iterate(target, objects[i], this.depth)
    }

    return target
  }

  private iterate(obj1: ITargetObject, obj2: object, depth: number) {
    if (--depth < 0) { return obj1 }

    const subject = this.iterateTarget ? obj1 : obj2
    const keys = Object.keys(subject)
    const length = keys.length

    for (let i = 0; i <= length; i = i + 1) {
      const key = keys[i]

      const obj1Val = obj1[key]
      const obj2Val = obj2[key]

      const obj1Type = typeOf(obj1[key])
      const obj2Type = typeOf(obj2[key])

      

    }
    // TODO: make this a for i loop of Object.keys()
    for (const key in subject) {
      if (! obj2.hasOwnProperty(key)) continue

      const obj1Type = typeOf(obj1[key])
      const obj2Type = typeOf(obj2[key])

      const testOptions = {
        obj1,
        obj2,
        subject,
        key,
        depth,
        options,
        assigning: false,
        recursing: false, // TODO: reduce these options a fuck load
      }

      if (
        (obj2Type in options.types) &&
        (obj1Type in options.types)
      ) {
        testOptions.recursing = true
        if (! _runTests(options.tests, testOptions)) continue // TODO: use .every

        _iterate(obj1[key], obj2[key], depth, options)
      } else {
        testOptions.assigning = true
        if (! _runTests(options.tests, testOptions)) continue

        obj1[key] = obj2[key]
      }
    }

    return obj1
  }
}

export const merge: IMerge = new Merge().merge

merge.black = new Merge({
  tests: [tests.black],
}).merge

merge.white = new Merge({
  iterateTarget: true,
  tests: [tests.white],
}).merge

export default merge
