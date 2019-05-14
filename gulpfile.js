'use strict';

// Load Gulp and tools we will use.
const gulp          = require('gulp'),
      fs            = require('fs'),
      deepmerge     = require('deepmerge'),
      inject        = require('gulp-inject'),
      sass          = require('gulp-sass'),
      sassGlob      = require('gulp-sass-glob'),
      sassLint      = require('gulp-sass-lint'),
      postcss       = require('gulp-postcss'),
      mqpacker      = require('css-mqpacker'),
      presetEnv     = require('postcss-preset-env'),
      cssnano       = require('cssnano'),
      eslint        = require('gulp-eslint'),
      browserSync   = require('browser-sync').create(),
      favicons      = require('favicons').stream;

// Load configuration.
const options = fs.existsSync('./config.json')
  ? deepmerge(require('./config.default.json'), require('./config.json'))
  : require('./config.default.json');

// Build CSS for development environment.
gulp.task('sass', function () {
  return gulp.src(options.sass.paths.src, {
      sourcemaps: options.sass.sourcemaps
    })
    .pipe(sassGlob(options.sassGlob))
    .pipe(sass(options.sass.config)).on('error', sass.logError)
    .pipe(postcss([
      presetEnv(options.postcss.postcssPresetEnv),
      mqpacker(options.postcss.mqpacker),
      cssnano(options.postcss.cssnano),
    ]))
    .pipe(gulp.dest(options.sass.paths.dest, {
      sourcemaps: options.sass.sourcemaps ? '.' : false
    }))
    .pipe(browserSync.reload({stream: true}));
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.sass.paths.src)
    .pipe(sassLint(options.sassLint))
    .pipe(sassLint.format())
});

// Lint JS
gulp.task('lint:js', function() {
  return gulp.src(options.js.paths.src)
    .pipe(eslint(options.eslint))
    .pipe(eslint.format())
});

// Lint Sass and JavaScript.
gulp.task('lint', gulp.parallel('lint:sass', 'lint:js'));

// Build everything.
gulp.task('build', gulp.series('sass', 'lint'));

// Watch for changes to Sass files and rebuild.
gulp.task('watch:css', function () {
  gulp.watch(options.sass.paths.src, gulp.series('sass', 'lint:sass'));
});

// Watch for changes to JS files and lint them.
gulp.task('watch:js', function () {
  gulp.watch(options.js.paths.src, gulp.series('lint:js'));
});

// Initiate BrowserSync server.
gulp.task('serve', function() {
  browserSync.init(options.browserSync);
});

// Generate favicons.
gulp.task('favicons:generate', function () {
  return gulp.src(options.favicons.paths.src)
    .pipe(favicons(options.favicons.config))
    .pipe(gulp.dest(options.favicons.paths.dest));
});

// Inject favicons into template.
gulp.task('favicons:inject', function() {
  return gulp.src(options.favicons.paths.templateDir + options.favicons.paths.templateFile)
    .pipe(inject(gulp.src(options.favicons.paths.dest + options.favicons.config.html), {
      transform: function (filePath, file) {
        return file.contents.toString();
      }
    }))
  .pipe(gulp.dest(options.favicons.paths.templateDir));
});

// Wrapper task for handling favicons.
gulp.task('favicons', gulp.series('favicons:generate', 'favicons:inject'));

// Default watch task.
gulp.task('watch', gulp.parallel('serve', 'watch:css', 'watch:js'));

// The default task.
gulp.task('default', gulp.series('build'));
