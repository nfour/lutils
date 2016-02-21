
exports["clone"] = (test) ->
    expected =
        a: [
            1, {
                b: regex = /aaa/i
                c: do ->
                    fn = -> true
                    fn.b = -> fn()

                    return fn

                d: class Test
                    constructor: ->
                        @val = true
                    a: -> @val

                e: new Test()


            }
        ]

    actual = clone expected, null, [ 'object', 'array', 'function' ]

    console.log inspect expected
    console.log inspect actual

    #test.deepEqual actual, expected
    test.ok actual.a[1].c?()
    test.ok actual.a[1].c.b?()
    test.ok new actual.a[1].d().a()
    test.ok actual.a[1].e.a()

    test.ok actual.a isnt expected.a
    test.ok actual.a[1] isnt expected.a[1]

    test.done()
