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
const collections = require('metalsmith-collections'); // Group content into collections
const inPlace = require('metalsmith-in-place'); // Render templating syntax in source files
const codeHighlight = require('metalsmith-code-highlight'); // Syntax highlighter
const layouts = require('metalsmith-layouts'); // Apply layouts to source files
const browserSync = require('metalsmith-browser-sync'); // Local server

const templateConfig = {
	directory: 'views',
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
	.source('./src') // Set page source directory
	.destination('./build') // Set destination directory

	// Render templating syntax in source files
	.use(inPlace(templateConfig))

	// Syntax highlighter
	.use(codeHighlight())

	// Group content into collections
	.use(collections({
		layouts: {
			pattern: 'layouts/**/*'
		}
	}))

	// Apply layouts to source files
	.use(layouts(templateConfig))

	// Local server
	.use(browserSync({
		server: 'build',
		files: ['src/**/*', 'views/**/*.njk', 'macros/**/*.njk']
	}))

	// Tell Metalsmith to build the site
	.build(function(error) {
		if (error) {
			throw error;
		}
		console.log('Build finished');
	});