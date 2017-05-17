import { merge, Merge } from './merge'

describe('Merge', () => {
  it('basic merge', () => {
    const expected = {
      a: { b: {} },
      c: { },
      d: 2,
    }

    const merged = merge(
      { c: 'overwriteMe', d: 'overwriteMe' },
      expected,
    )

    expect(merged).toEqual(expected)
    expect(merged.c).toBe(expected.c)
    expect(merged.d).toBe(expected.d)
  })

  it('basic merge 2', () => {
    const merged2 = merge(
      { c: 'overwriteMe', d: 'overwriteMe' },
      { c: 1, d: 1, a: { b: 1 }, f: 1 },
      { a: { x: 1, b: 2 } },
    )

    expect(merged2.c).toBe(1)
    expect(merged2.d).toBe(1)
    expect(merged2.a.x).toBe(1)
    expect(merged2.a.b).toBe(2)
    expect(merged2.f).toBe(1)
  })

  it('merges with depth limits', () => {
    const subject = { a: { b: 1 } }

    new Merge({ depth: 0 }).merge(subject, { a: 1 })

    expect(subject.a).toBe(subject.a)

    new Merge({ depth: 1 }).merge(subject, { a: 1 })

    expect(subject.a).toBe(1)
  })

  it('preserves references', () => {
    const subject = {
      a: { b: { c: 1 } },
    }

    const fragment = subject.a.b

    merge(
      subject,
      { a: { b: { c: 2 } } },
    )

    expect(subject.a.b).toBe(fragment)
  })

  it('merge.white', () => {
    const obj1 = { a: { notIgnored: false } as any }
    const obj2 = { a: { notIgnored: true, ignored: true } as any }

    merge.white(obj1, obj2)

    expect(obj1.a).not.toBe(obj2.a)
    expect(obj1.a.notIgnored).toBe(true)
    expect(obj1.a.ignored).toBe(undefined)
  })

  it('new Merge.White().merge', () => {
    const obj1 = { a: { notIgnored: false } as any }
    const obj2 = { a: { notIgnored: true, ignored: true } as any }

    new Merge.White().merge(obj1, obj2)

    expect(obj1.a).not.toBe(obj2.a)
    expect(obj1.a.notIgnored).toBe(true)
    expect(obj1.a.ignored).toBe(undefined)
  })

  it('merge.black', () => {
    const obj1 = { a: { ignored: false } as any }
    const obj2 = { a: { ignored: true, notIgnored: true } as any }

    merge.black(obj1, obj2)

    expect(obj1.a).not.toBe(obj2.a)
    expect(obj1.a.notIgnored).toBe(true)
    expect(obj1.a.ignored).toBe(false)
  })
})
