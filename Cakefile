
{ spawn, spawnSync } = require 'child_process'

# Builds coffeescript from ./src to ./
build = (args, done) ->
	coffee = spawn 'coffee', args
	
	coffee.stdout.on 'data', (data) -> console.log data.toString()
	coffee.stderr.on 'data', (data) -> console.error data.toString()
	coffee.on 'exit', (status) -> done?() if status is 0


task 'build', 'Build ./src to ./', ->
	build [ '-c', '-o', '.', './src' ]

task 'watch', 'Build ./src to ./ and watch', ->
	build [ '-wc', '-o', '.', './src' ]
	
task 'test::app', 'Runs a test server', ->
	require './test/app'