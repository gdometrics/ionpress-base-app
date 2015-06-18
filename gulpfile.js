var gulp = require('gulp');
var karma = require('gulp-karma');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var bulkSass = require('gulp-sass-bulk-import');
var wiredep = require('wiredep').stream;
var ngConstant = require('gulp-ng-constant');
var templateCache = require('gulp-angular-templatecache');
var shell = require('gulp-shell');
var coveralls = require('gulp-coveralls');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'templates', 'bower', 'config']);

gulp.task('config', function () {
  gulp.src('env/wp-api.json')
    .pipe(ngConstant())
    .pipe(rename('wp-api.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(bulkSass())
        .pipe(sass({
            compass: true,
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('templates', function(){
    return gulp.src('./www/views/**/*.html')
        // Create entries within $templateCache
        // Module uses ionic namespace as we can always guarantee it's existence within our application
        .pipe(templateCache('templates.js',{module: 'ionic', root:'views/'}))
        .pipe(gulp.dest('www/js'));
});

gulp.task('test', ['templates'], function () {
    gulp.src('env/wp-api-test.json')
        .pipe(ngConstant())
        .pipe(rename('wp-api.js'))
        .pipe(gulp.dest('./www/js'));

    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: './tests/karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            process.exit(1);
        });
});

gulp.task('coverage', ['test'], function () {
    return gulp.src('tests/coverage/**/lcov.info')
        .pipe(coveralls()).on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            process.exit(1);
        });
});

gulp.task('autotest', function () {
    return gulp.watch(['./www/js/**/*.js', './tests/spec/*.js'], ['test']);
});

gulp.task('bump', require('gulp-cordova-bump'));

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('bower', function () {
    gulp.src('./www/index.html')
        .pipe(wiredep({
            exclude: "www/vendor/angular/angular.js"
        }))
        .pipe(gulp.dest('./www'));
});

gulp.task('docs', shell.task([
    'node_modules/jsdoc/jsdoc.js '+
    '-c docs/config/conf.json '+
    '-t docs/config/theme '+
    '-d docs/html '+
    '-P package.json '+
    './README.md '+
    '-r www/js'
]));

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('code-coverage', function () {
    gulp.src('test/coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
