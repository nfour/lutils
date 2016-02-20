var merge = require('./merge')

exports["merge"] = function(test) {
    var expected = {
        a: { b: {} }
    }

    test.deepEqual(expected, merge({}, expected))
    test.done()
}

exports["merge.white"] = function(test) {
    var obj1 = { a: { notIgnored: false } }
    var obj2 = { a: { notIgnored: true, ignored: true } }

    merge.white(obj1, obj2)
    test.ok(obj1.a.notIgnored)
    test.done()
}

exports["merge.black"] = function(test) {
    var obj1 = { a: { ignored: true } }
    var obj2 = { a: { ignored: false, notIgnored: true } }

    merge.black(obj1, obj2)
    test.ok(obj1.a.ignored === true && obj1.a.notIgnored === true)
    test.done()
}
