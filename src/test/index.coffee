{ typeOf, merge, clone, debounce } = require '../index'

inspect = (val) -> require('util').inspect val, { depth: 5, colors: true, showHidden : true }

# TODO: make these actual tests

exports["merge"] = (test) ->
	expected =
		a: { b: {} }

	test.deepEqual expected, merge {}, expected
	test.done()

exports["merge.white"] = (test) ->
	obj1 = { a: { notIgnored: false } }
	obj2 = { a: { notIgnored: true, ignored: true } }

	merge.white obj1, obj2
	test.ok obj1.a.notIgnored
	test.done()
	
exports["merge.black"] = (test) ->
	obj1 = { a: { ignored: true } }
	obj2 = { a: { ignored: false, notIgnored: true } }

	merge.black obj1, obj2
	test.ok obj1.a.ignored is true and obj1.a.notIgnored is true
	test.done()
	
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

types =
	'undefined'	: undefined
	'boolean'	: true
	'string'	: '""'
	'function'	: ->
	'array'		: []
	'object'	: {}
	'null'		: null
	'number'	: 0
	'date'		: new Date()
	'regexp'	: /a/
	'nan'		: NaN


for type, val of types then do (type, val) ->
	exports["typeOf.#{type}"] = (test) ->
		test.ok ( __type = typeOf val ) is type

		# Make sure types don't double up for any other values
		for _type, _val of types when _type isnt type
			test.ok ( typeOf val ) isnt _type
		
		test.done()

exports["benchmark"] = (test) ->
	iterations = 50000
	
	start = new Date()
	for i in [0..iterations]
		merge { a: { a: {}, b: {} } }, { a: { c: {}, b: 1 } }
		
	console.log "merge()		* #{iterations} took #{ new Date() - start }ms"
	
	start = new Date()
	for i in [0..iterations]
		merge.white { a: { a: {}, b: {} } }, { a: { c: {}, b: 1 } }
		
	console.log "merge.white()	* #{iterations} took #{ new Date() - start }ms"
	
	start = new Date()
	for i in [0..iterations]
		merge.black { a: { a: {}, b: {} } }, { a: { c: {}, b: 1 } }
		
	console.log "merge.black()	* #{iterations} took #{ new Date() - start }ms"
	
	start = new Date()
	for i in [0..iterations]
		clone { a: { a: {}, b: {} } }, 22
		
	console.log "clone()		* #{iterations} took #{ new Date() - start }ms"

	test.done()


