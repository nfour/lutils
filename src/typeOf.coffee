
###
	Returns the primitive type of a value as a lowercase string.
###
module.exports = typeOf = (val) ->
	type = Object::toString.call( val ).slice(8, -1).toLowerCase()
	
	type = 'nan' if type is 'number' and isNaN val
	
	return type
	
types = [
	'Undefined'
	'Boolean'
	'String'
	'Function'
	'Array'	
	'Object'
	'Null'
	'Number'
	'Date'
	'RegExp'
	'NaN'
]

for key in types then do (key) ->
	lowerKey		= key.toLowerCase()
	typeOf[ key ]	= (val) -> typeOf( val ) is lowerKey
