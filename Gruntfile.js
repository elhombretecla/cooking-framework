module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* Watch task : SASS  */
        sass: {
            dist: {
                options: { 
                    style: 'compressed'
                },
                files: { 
                    'css/style.css': 'sass/style.scss',
                }
            }
        },
        watch: {
            html: {
                files: '**/*.html'
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            options: {
                livereload: true
            }
        },
        uglify: {
            my_target: {
                files: {
                'js/features.min.js': ['js/features.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    // Launch task.
    grunt.registerTask('default', ['watch']);

};