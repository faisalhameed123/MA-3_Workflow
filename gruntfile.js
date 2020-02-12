module.exports = function(grunt){
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       sass: {
           dist: {
               files: {
                   'dist/css/styles.css' : 'sass/styles.scss'
               }
           }
       },
       cssmin: {
            minify: {
                src: 'dist/css/styles.css',
                dest: 'dist/css/styles.min.css'
            }
       },
       browserSync: {
           dev: {
               bsFiles: {
                   src: [
                       'dist/css/styles.min.css',
                       '*.html'
                   ]
               },
               options: {
                   watchTask: true,
                   server: './'
               }
           }
       },
       image: {
        static: {
          options: {
            optipng: false,
            pngquant: true,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true
          },
          files: {
            'dist/img/grunt-imagemin.jpg': 'img/grunt-imagemin.jpg',
          }
        },
        dynamic: {
          files: [{
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/img'
          }]
        }
      },
       watch: {
           css: {
               files: 'sass/styles.scss',
               tasks: ['sass','cssmin']
           }
       }
    })

    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-browser-sync')
    grunt.loadNpmTasks('grunt-image');
    grunt.registerTask('default', ['browserSync','watch','image'])
}