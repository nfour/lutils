var typeOf = require('lutils-typeof')
var clone = require('./clone')

var inspect = function(val) {
    return require('util').inspect(val, { depth: 5, colors: true, showHidden : true })
}

exports["clone"] = function(test) {
    var regex, Class

    var expected = {
        a: [
            1, {
                b: regex = /aaa/i,
                c: (function() {
                    var fn
                    fn = function() {
                        return true
                    }

                    fn.b = function() {
                        return fn()
                    }

                    fn.obj = {}

                    return fn
                })(),
                d: Class = (function() {
                    function Test() {
                        this.val = true
                    }

                    Test.prototype.a = function() {
                        return this.val
                    }

                    return Test

                })(),
                e: new Class()
            }
        ]
    }


    var actual = clone(expected, { types: ['object', 'array', 'function'] })

    console.log( 'expected', inspect(expected) )
    console.log( 'actual', inspect(actual) )

    test.ok( typeOf.Function(actual.a[1].c) )
    test.ok( actual.a[1].c === expected.a[1].c )
    test.ok( new actual.a[1].d().a() )
    test.ok( actual.a[1].e.a() )
    test.ok( actual.a !== expected.a )
    test.ok( actual.a[1] !== expected.a[1] )
    
    return test.done()

}
