module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({
		pkg   : grunt.file.readJSON('package.json'),
		
		sass: {
			options: {
				precision: 3
			},
			all    : {
				files: {
					'css/global.css': 'css/sass/global.scss',
					'css/global-old-ie.css': 'css/sass/global-old-ie.scss',
				}
			}
		},

		autoprefixer: {
			options: {
				map: true
			},
			default: {
				files: {
						'css/global.css': 'css/global.css',
						'css/global-old-ie.css': 'css/global-old-ie.css',
					}
			}

		},

		watch : {

			sass: {
				options: {
					debounceDelay: 500
				},
				files  : ['css/sass/**/*.scss'],
				tasks  : ['sass', 'autoprefixer']
			}
		}
	});

	// Load other tasks

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// Default task.

	grunt.registerTask('default', ['sass', 'autoprefixer']);


	grunt.util.linefeed = '\n';
};