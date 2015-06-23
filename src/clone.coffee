typeOf	= require './typeOf'
merge	= require './merge'

###
	Clones an object by iterating over objects and array, re-wrapping them.
	Copies over own properties, refrences previous object's __proto__
###
module.exports	=
clone			= (obj, depth = clone.depth, types = clone.types) ->
	types		= clone.castTypes types
	skeleton	= clone.skeleton obj, null, types
	
	return clone.iterate skeleton or {}, obj, depth, types
	
clone.skeleton = (value, type, types) ->
	type ?= typeOf value
	
	return null if type not of types
	
	return switch type
		when 'object'
			if value.__proto__ then Object.create value.__proto__ else {}
		when 'array'
			[]
		else null

###
	Defaults
###
clone.depth		= 8
clone.types		= { object: true, array: true }
clone.castTypes	= (types) ->
	return types if typeOf.Object types
	obj = {}
	obj[key] = true for key in types
	
	return obj

clone.iterate = (obj1, obj2, depth, types) ->
	if --depth >= 0
		parentType = typeOf obj2
		
		for own key, value of obj2
			type = typeOf value

			if type of types and depth > 0
				if skeleton = clone.skeleton value, type, types
					value = clone.iterate skeleton, value, depth, types if depth > 0

			obj1[ key ] = value
			
	return obj1

###
	[Deprecated.]
###
clone.array = (obj) ->
	return obj.slice(0)


###
	[Deprecated.]
###
clone.json = (obj, depth = clone.depth) ->
	cloned = JSON.parse JSON.stringify obj
	merge cloned, clone.findRegExp( obj ), depth, [ 'object', 'array' ]

###
	[Deprecated.]
	
	Recursively finds all RegExp in an object by creating a deep skeleton object
	containing only the RegExp values. Useful when you wish to preserve RegExp (which can't be done with JSON cloning).
###
clone.findRegExp = (obj) ->
	results = {}
	for key, val of obj
		switch typeOf val
			when 'regexp'
				results[ key ] = val
			when 'array', 'object'
				results[ key ] = arguments.callee val

	return results