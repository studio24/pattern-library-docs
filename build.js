/*
 * Metalsmith build file
 * Build site with `node build`
 */

const toUpper = function (string) {
	return string.toUpperCase();
}

const spaceToDash = function (string) {
	return string.replace(/\s+/g, "-");
}

// Get our requirements, installed by npm
const metalsmith = require('metalsmith'); // Static site generator
const inPlace = require('metalsmith-in-place'); // Render templating syntax in source files
const codeHighlight = require('metalsmith-code-highlight');
const layouts = require('metalsmith-layouts'); // Apply layouts to source files
const serve = require('metalsmith-serve'); // Simple http server for development
const watch = require('metalsmith-watch'); // Watch for file changes and trigger rebuilds

const templateConfig = {
	engineOptions: {
		noCache: true, // never use a cache and recompile templates each time
		filters: {
			toUpper: toUpper,
			spaceToDash: spaceToDash,
		}
	}
}

// Run Metalsmith in the current directory
metalsmith(__dirname)
	.clean(true) // Clean the destination directory before build
	.source('src') // Set page source directory
	.destination('build') // Set destination directory

	// Render templating syntax in source files
	.use(inPlace(templateConfig))

	.use(codeHighlight())

	// Apply layouts to source files
	.use(layouts(templateConfig))

	// Serve
	.use(serve({
		port: 8081,
		verbose: true
	}))

	// Watch
	.use(watch({
		paths: {
			'${source}/**/*': true,
			'layouts/**/*': '**/*',
			'macros/**/*': '**/*'
		}
	}))

	// Tell Metalsmith to build the site
	.build(function(error) {
		if (error) {
			throw error;
		}
		console.log('Build finished');
	});