// Get our requirements, installed by npm
const Metalsmith = require('metalsmith'); // Static site generator
const inPlace = require('metalsmith-in-place'); // Render templating syntax in your source files


// Run Metalsmith in the current directory
Metalsmith(__dirname)
	.clean(true) // Clean the build directory
	.source('src') // Set page source directory
	.destination('build') // Set destination directory

	// Tell Metalsmith to build the site
	.build(function(err, files) {
		if (err) { throw err; }
	});