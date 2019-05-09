'use strict';

// Load Gulp and tools we will use.
var $          = require('gulp-load-plugins')(),
  del        = require('del'),
  extend     = require('extend'),
  fs         = require('fs'),
  gulp       = require('gulp'),
  importOnce = require('node-sass-import-once'),
  sassGlob   = require('gulp-sass-glob');

var options = {};

options.gulpWatchOptions = {};
options.rootPath = {
  project     : __dirname + '/',
  theme       : __dirname + '/'
};

options.theme = {
  root       : options.rootPath.theme,
  scss       : options.rootPath.theme + 'scss/',
  css        : options.rootPath.theme + 'css/'
};

// Define the node-scss configuration.
options.scss = {
  importer: importOnce,
  outputStyle: 'compressed',
  lintIgnore: ['scss/_settings.scss', 'scss/base/_drupal.scss'],
};

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    'last 2 versions',
    'ie >= 11'
  ]
};

var scssFiles = [
  options.theme.scss + '**/*.scss',
  // Do not open scss partials as they will be included as needed.
  '!' + options.theme.scss + '**/_*.scss',
];

// Build CSS for development environment.
gulp.task('sass', function () {
  return gulp.src(scssFiles)
    .pipe($.sourcemaps.init())
    .pipe($.sassGlob())
    // Allow the options object to override the defaults for the task.
    .pipe($.sass(extend(true, {
      noCache: true,
      outputStyle: options.scss.outputStyle,
      sourceMap: true
    }, options.scss)).on('error', $.sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css));
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.theme.scss + '**/*.scss')
    // use gulp-cached to check only modified files.
    .pipe($.sassLint({
      files: {
        include: $.cached('scsslint'),
        ignore: options.scss.lintIgnore
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
        'extends-before-declarations': 0,
        'extends-before-mixins': 0,
        'mixins-before-declarations': 0,
        'class-name-format': 0,
        'no-transition-all': 0,
        'space-around-operator': 0,
        'force-attribute-nesting': 0,
        'no-ids': 0
      }
    }))
    .pipe($.sassLint.format());
});

// Lint Sass and JavaScript.
// @todo needs to add a javascript lint task.
gulp.task('lint', gulp.series('lint:sass'));

// Build everything.
gulp.task('build', gulp.series('sass', 'lint'));

// Watch for changes for scss files and rebuild.
gulp.task('watch:css', gulp.series('sass', 'lint:sass'), function () {
  return gulp.watch(options.theme.scss + '**/*.scss', options.gulpWatchOptions, gulp.series('sass', 'lint:sass'));
});

// Default watch task.
// @todo needs to add a javascript watch task.
gulp.task('watch', gulp.parallel('watch:css'));

// The default task.
gulp.task('default', gulp.series('build'));
