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
See [https://www.npmjs.com/package/@zivtech/starterlight-tasks](https://www.npmjs.com/package/@zivtech/starterlight-tasks).

### Local configuration overrides
You can override the default configuration for just your local environment by creating a `config.json` file at the theme root. Copy the configuration from `config.default.json` you want to override into `config.json` and customize the values.
