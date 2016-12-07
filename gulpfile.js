var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var reload = browserSync.reload;

var $ = gulpLoadPlugins();

//Let's stylus work it's magic
gulp.task('stylus', function() {
    return gulp.src('src/.tmp/*.styl')
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe(reload({stream: true}))
        .pipe(gulp.dest('src/styles'));
});

gulp.task('stylus:dist-min', function() {
    return gulp.src('src/.tmp/*.styl')
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe($.cssnano())
        .pipe($.rename('flexgrid.min.css'))
        .pipe(reload({stream: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('stylus:dist', function() {
    return gulp.src('src/.tmp/*.styl')
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe(reload({stream: true}))
        .pipe(gulp.dest('dist'));
});


//Starts local server
gulp.task('serve', function() {
  var files = [
    'test-local/*.html',
    'src/.tmp/*.styl',
    'src/**/*.js',
  ];
    browserSync({
        files: files,
        notify: false,
        port: 9000,
        browser: "google chrome",
        server: {
            baseDir: ['src', '.tmp', 'test-local'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });
    gulp.watch('src/.tmp/*.styl', ['stylus']).on('change', reload);
});





gulp.task('build', ['stylus:dist-min', 'stylus:dist'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});
