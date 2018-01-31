module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.initConfig({
        copy: {
            fontAwesome: {
                expand: true,
                flatten: true,
                src: './node_modules/font-awesome/fonts/*',
                dest: 'html/fonts'
            }
        },
        sass: {
            options: {
                loadPath: 'node_modules/bootstrap/scss',
                sourcemap: 'none'
            },
            dist: {
                files: {'src/css/tmp/main.css': ['src/scss/main.scss']}
            }
        },
        concat_css: {
            main: {
                options: {
                    // Task-specific options go here.
                },
                files: {
                    'src/css/tmp/main.concat.css':
                        [
                            'node_modules/font-awesome/css/font-awesome.min.css',
                            'src/css/tmp/main.css'
                        ],
                },
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {'html/css/main.min.css': ['src/css/tmp/main.concat.css']}
            }
        },
        concat: {
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/popper.js/dist/umd/popper.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'src/js/main.js'
                ],
                dest: 'src/js/tmp/main.concat.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: {'html/js/main.min.js': ['src/js/tmp/main.concat.js']}
            }
        },
        watch: {
            options: {livereload: true},
            files: ['src/scss/main.scss', 'src/scss/*/*.scss', 'src/js/*.js', 'htnl/index.html'],
            tasks: ['process-css', 'process-js']
        },
        express: {
            all: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    bases: ['./html'],//shit, must be folder
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('process-css', ['sass', 'concat_css', 'cssmin']);
    grunt.registerTask('process-js', ['sass', 'concat', 'uglify']);
    grunt.registerTask('server', ['express', 'watch']);

};