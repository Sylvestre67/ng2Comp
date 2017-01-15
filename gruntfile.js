module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    copy:{
      custom:{
        files:[
          {
            expand: true,
            src: [
              './dist/**', './dist/**/*',
            ],
            dest: '../../../sites/sylz/',
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};
