var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var minify = require('gulp-minify');

gulp.task('bundle', ['unminified', 'minified']);

gulp.task('unminified', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            // sourceRoot: "./src/main.js",
            // rootDir: "./src/main.js",
            // noImplicitAny: true,
            // module:'amd',
            // target:'es5
            //noImplicitAny: true,
            module: 'umd'
            //target: 'es5',
            //moduleResolution: 'classic',
            // out: 'time-events-manager.js'
        }))
        .pipe(concat('time-events-manager.js'))
        .pipe(gulp.dest('dist'));
});

// gulp.task('minified', function () {
//     return gulp.src('src/**/*.ts')
//         .pipe(ts({
//             noImplicitAny: true
//         }))
//         .pipe(concat('time-events-manager.js'))
//         .pipe(minify())
//         .pipe(rename({
//             basename: 'time-events-manager',
//             extname: '.min.js'
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('build-src', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            module: 'umd',
            target: 'es5',
            declaration: true,
            noImplicitAny: true
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});