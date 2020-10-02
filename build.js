// Get our requirements, installed by npm
const Metalsmith = require('metalsmith'); // Static site generator


// Run Metalsmith in the current directory
Metalsmith(__dirname)
	.clean(true) // Clean the build directory
	.source('src') // Set page source directory
	.destination('build') // Set destination directory

	// And tell Metalsmith to build the site
	.build(function(err, files) {
		if (err) { throw err; }
	});