module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> - MIT Licensed, see http://github.com/bhollis/aruco-marker-js */\n',
    copy: {
      main: {
        src: '<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.js'
      },
    },
    uglify: {
      build: {
        src: '<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: false,
        },
        files: {
          src: [ 'build/*.js' ]
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', '<%= pkg.name %>.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          module: true
        }
      }
    },
    jasmine_node: {
      projectRoot: ".",
      verbose: true,
      forceExit: true,
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['test']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['jshint', 'test', 'copy', 'uglify', 'usebanner']);
};
