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
            dest: '../',
          },
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy']);
};
