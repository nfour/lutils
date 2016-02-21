var typeOf = require('./typeOf')

var samples = {
    'undefined'	: undefined,
    'boolean'	: true,
    'string'	: '""',
    'function'	: function() {},
    'array'		: [],
    'object'	: {},
    'null'		: null,
    'number'	: 0,
    'date'		: new Date(),
    'regexp'	: /a/,
    'nan'		: NaN,
}

Object.keys(samples).forEach(function(key) {
    var value = samples[key]

    exports["typeOf." + key] = function(test) {
        test.ok( typeOf(value) === key )

        test.done()
    }
})
