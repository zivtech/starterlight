# Starterlight

A starter theme for Drupal 8 projects.

- [Configuration](#configuration)
   - [Options](#options)
   - [Local configuration overrides](#local-configuration-overrides)

## Configuration
Theme configuration is in the `config.default.json` file. You will probably be happy with most of the defaults in this file, though you should absolutely tailor these options for each theme:

```
"favicons": {
  "config": {
    "appName": "Enter the name of the site or app here",
    "appDescription": "Enter a short description of the site or app here",
    "appleStatusBarStyle": "Style for Apple status bar: 'black-translucent', 'default', or 'black'",
    "background": "Hexadecimal background color for flattened icons.",
    "theme_color": "Hexadecimal color used, for example, in Android's task switcher.",
  }
},
"browserSync": {
  "proxy": "Enter the most commonly used local environment address, e.g. 'sitename.lndo.site' for sites with Lando support. Browsersync will not work properly if this is not set to a valid URL."
}
```

### Options
**sourcemaps** (bool)

Turn Sass sourcemaps on or off.

**sass** (obj)

 - **paths** (obj)
    - **src**: A glob of Sass files to be compiled into CSS.
    - **dest**: The directory the compiled CSS file will be placed in.
 - **config**: An object of [node-sass configuration options](https://github.com/sass/node-sass#options).

**sassGlob** (obj)

An object of [gulp-sass-glob configuration options](https://github.com/mikevercoelen/gulp-sass-glob).

**sassLint** (obj)

An object of [sass-lint configuration options](https://github.com/sasstools/sass-lint#configuring).

**postcss** (obj)

- **postcssPresetEnv**: An object of [postcss-preset-env configuration options](https://github.com/csstools/postcss-preset-env#options). Use this if you need to support older browsers (e.g. IE11) but want to use newer CSS specifications. See https://preset-env.cssdb.org/features for a list of features this helps support.
- **mqpacker**: An object of [mqpacker configuration options](https://github.com/hail2u/node-css-mqpacker#options).
- **cssnano**: An object of [cssnano configuration options](https://cssnano.co/guides/presets). We use the default preset and override a few of its optimization options.

**favicons** (obj)

- **paths** (obj)
    - **src**: The path to the image file from which the rest of the favicons will be created.
    - **dest**: The directory the generated favicons will be placed in.
    - **templateFile**: The name of the template file where favicons will be injected. This should be to `html.html.twig` unless you changed where the injection tags are located.
    - **templateDir**: The path to the directory where the `templateFile` lives.
- **config**: An object of [favicons configuration options](https://github.com/itgalaxy/favicons#usage).

**browserSync** (obj)

An object of [Browsersync configuration options](https://www.browsersync.io/docs/options).

### Local configuration overrides
You can override the default configuration for just your local environment by creating a `config.json` file at the theme root. Copy the configuration from `config.default.json` you want to override into `config.json` and customize the values.
