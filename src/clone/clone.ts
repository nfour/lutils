import { typeOf } from '../typeOf'

export class Clone {
  public depth = 10
  public types = { object: true, array: true }
  private usingDefaultDepth = true

  constructor(options?: {
    /** Limit by which cloning ends and references are maintained */
    depth?: number

    /**
     * Determines clone behaviour for traversable types:
     * - When `true`, value is cloned and traversed
     * - When `false`, references are kept
     */
    types?: { object?: boolean, array?: boolean },
  }) {
    if (options) {
      Object.assign(this, options)
      this.usingDefaultDepth = !('depth' in options)
    }
  }

  /**
   * Clones an object by traversing over object-like values.
   * - Cloned: **Array**, **Object**
   * - Referenced: **Function**, **{}.\_\_proto\_\_**
   */
  public clone = <S>(source: S): S => {
    if (!source) { throw new Error('[ERROR clone] Invalid input') }

    const subject = this.skeletonize(source)

    return this.traverse(subject, source, this.depth)
  }

  private traverse(subject, source, depth: number) {
    if (--depth < 0) {
      this.depthWarning()
      return subject
    }

    if (!subject) { subject = source }

    Object.keys(source).forEach((key) => {
      let value = source[key]
      const type = typeOf(value)

      if (this.types[type]) {
        const nextSubject = this.skeletonize(value, type)

        value = this.traverse(nextSubject, value, depth)
      }

      subject[key] = value
    })

    return subject
  }

  private skeletonize(value: any, type?: string) {
    if (!type) { type = typeOf(value) }

    if (!this.types[type]) { return }

    if (type === 'object') {
      return value.__proto__
        ? Object.create(value.__proto__)
        : {}

    } else
    if (type === 'array') {
      return []
    }
  }

  private depthWarning() {
    if (this.usingDefaultDepth) {
      console.warn(`[WARNING clone] default depth of ${this.depth} reached. Be explicit, set this manually`)
    }
  }
}

export const clone = new Clone().clone
