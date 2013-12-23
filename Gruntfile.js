module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy, HH:MM:ss") %> */\n'
            },
            main: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        },
        jasmine: {
            main: {
                src: '<%= pkg.name %>.js',
                options: {
                    helpers: 'test/helper/**/*.js',
                    specs: 'test/spec/**/*.js',
                    vendor: [
                        'bower_components/jquery/jquery.js',
                        'bower_components/underscore/underscore.js',
                        'bower_components/backbone/backbone.js',
                        'test/vendor/**/*.js'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jasmine:main', 'uglify:main']);
    
    grunt.registerTask('test', ['jasmine:main']);
};
