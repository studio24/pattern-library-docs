// Get our requirements, installed by npm
const Metalsmith = require('metalsmith'); // Static site generator.

// Run Metalsmith in the current directory.
Metalsmith(__dirname)
	.destination('./build')

	// And tell Metalsmith to fire it all off.
	.build(function(err, files) {
		if (err) { throw err; }
	});