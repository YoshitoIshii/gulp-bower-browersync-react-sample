var gulp = require('gulp');
var browserSync = require('browser-sync');
var bower = require('gulp-bower');
var reload = browserSync.reload;

gulp.task('default', ['bower','serve']);

gulp.task('bower', function() {
  return bower().pipe(gulp.dest('app/js/lib/'))
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 3001,
        ui: {
            port: 3002,
            weinre: {
                port: 3003
            }
        }
    });

    gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {
        cwd: 'app'
    }, reload);
});

