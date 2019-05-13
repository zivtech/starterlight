'use strict';

// Load Gulp and tools we will use.
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      sassGlob      = require('gulp-sass-glob'),
      sassLint      = require('gulp-sass-lint'),
      autoprefixer  = require('gulp-autoprefixer'),
      browserSync   = require('browser-sync').create();

const paths = {
  styles: {
    src: __dirname + '/scss/**/*.scss',
    dest: __dirname + '/css/',
  },
};

const options = {
  // Enter local environment address.
  local: 'local.dev',
  // Turn sourcemaps on or off.
  sourcemaps: true,
  // Configure node-sass
  sass: {
    outputStyle: 'expanded',
  },
  // Configure sass-lint.
  sassLint: {
    files: {
      ignore: ['scss/00-base/settings/**/*.scss'],
    },
    rules: {
      'property-sort-order': 0,
      'indentation': 0,
      'no-color-literals': 0,
      'variable-name-format': 0,
      'force-element-nesting': 0,
      'no-qualifying-elements': 0,
      'placeholder-in-extend': 0,
      'nesting-depth': 0,
      'leading-zero': 0,
      'no-duplicate-properties': 0,
      'no-vendor-prefixes': 0,
      'force-pseudo-nesting': 0,
      'pseudo-element': 0,
      'no-important': 0,
      'extends-before-declarations': 2,
      'extends-before-mixins': 0,
      'mixins-before-declarations': [
        2,
        {
          'exclude': [
            'bp',
          ],
        },
      ],
      'declarations-before-nesting': 2,
      'class-name-format': 0,
      'no-transition-all': 0,
      'space-around-operator': 0,
      'force-attribute-nesting': 0,
      'no-ids': 0,
      'no-misspelled-properties': 0,
    },
  },
  // Configure autoprefixer.
  autoprefixer: {},
};

// Build CSS for development environment.
gulp.task('sass', function () {
  return gulp.src(paths.styles.src, {
      sourcemaps: options.sourcemaps
    })
    .pipe(sassGlob())
    .pipe(sass(options.sass)).on('error', sass.logError)
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(paths.styles.dest, {
      sourcemaps: options.sourcemaps ? '.' : false
    }))
    .pipe(browserSync.reload({stream: true}));
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(paths.styles.src)
    // use gulp-cached to check only modified files.
    .pipe(sassLint(options.sassLint))
    .pipe(sassLint.format())
});

// Lint Sass and JavaScript.
// @todo needs to add a javascript lint task.
gulp.task('lint', gulp.series('lint:sass'));

// Build everything.
gulp.task('build', gulp.series('sass', 'lint'));

// Watch for changes for scss files and rebuild.
gulp.task('watch:css', function () {
  gulp.watch(paths.styles.src, gulp.series('sass', 'lint:sass'));
});

// Initiate BrowserSync server.
gulp.task('serve', function() {
  browserSync.init({
    proxy: options.local,
  });
});

// Default watch task.
// @todo needs to add a javascript watch task.
gulp.task('watch', gulp.parallel('serve', 'watch:css'));

// The default task.
gulp.task('default', gulp.series('build'));
