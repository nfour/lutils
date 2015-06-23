typeOf = require './typeOf'

###
	Merge the second object into the first recursively until depth is reached for each property.
	
	@param obj1 {Object}
	@param obj2 {Object} Merged into obj1
	@param depth {Number}
	@param types {Array} Array of types to iterate over. Defaults to ['object']
	@return obj1
###
module.exports = merge = (obj1, obj2, depth = merge.depth, types = merge.types) ->
	return merge.iterate obj1, obj2, depth, merge.castTypes types

###
	Whitelisted merge.
	Merges properties into object1 from object only if the property exists in object1
###
merge.white = (obj1, obj2, depth, types) -> merge.by obj1, obj2, depth, types, true

###
	Blacklisted merge.
	Merges properties into object1 from object only if the property *doesnt* exist in object1
###
merge.black = (obj1, obj2, depth, types) -> merge.by obj1, obj2, depth, types, false

###
	Defaults
###
merge.depth		= 8
merge.types		= { object: true }
merge.castTypes	= (types) ->
	return types if typeOf.Object types
	obj = {}
	obj[key] = true for key in types
	
	return obj

merge.iterate = (obj1, obj2, depth, types) ->
	if --depth >= 0
		for own key of obj2
			obj2Type = typeOf obj2[key]
			obj1Type = typeOf obj1[key]

			if (
				( obj2Type of types ) and
				key of obj1 and
				( obj1Type of types )
			)
				merge.iterate obj1[key], obj2[key], depth, types
			else
				obj1[key] = obj2[key]

	return obj1

# TODO: make the iterator an object but accept arrays

###
	Merge obj1 and obj2 by replacing values where both objects share the same keys, preffering obj1
###
merge.by = (obj1, obj2, depth = merge.depth, types = merge.types, whiteList = true) ->
	return merge.by.iterate obj1, obj2, depth, merge.castTypes( types ), whiteList

merge.by.iterate = (obj1, obj2, depth, types, whiteList) ->
	if --depth >= 0
		for own key of ( if not whiteList then obj2 else obj1 )
			obj2Type = typeOf obj2[key]
			obj1Type = typeOf obj1[key]
			
			if ( obj2Type of types ) and ( obj1Type of types )
				merge.by.iterate obj1[key], obj2[key], depth, types, whiteList
			else if not ( ( not whiteList and key of obj1 ) or ( whiteList and key not of obj2 ) )
				obj1[key] = obj2[key]

	return obj1
