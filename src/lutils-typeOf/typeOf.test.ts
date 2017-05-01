var typeOf = require('./typeOf')

var samples = [
    [ 'undefined', undefined ],
    [ 'boolean', true ],
    [ 'string', '""' ],
    [ 'function', function() {} ],
    [ 'array', [] ],
    [ 'object', {} ],
    [ 'null', null ],
    [ 'number', 0 ],
    [ 'number', Infinity ],
    [ 'date', new Date() ],
    [ 'regexp', /a/ ],
    [ 'nan', NaN ],
]

var typeKeys = [
    'Undefined',
    'Boolean',
    'String',
    'Function',
    'Array',
    'Object',
    'Null',
    'Number',
    'Date',
    'RegExp',
    'NaN',
]

samples.forEach(function(sample, index) {
    var key   = sample[0]
    var value = sample[1]

    exports[index + " - typeOf." + key] = function(test) {
        test.ok( typeOf(value) === key )

        var upperKey = typeKeys.filter(function(_key) {
            return _key.toLowerCase() === key
        })[0]

        test.ok( typeOf[ key ](value) )
        test.ok( typeOf[ upperKey ](value) )

        test.done()
    }
})
