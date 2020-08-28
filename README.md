# How to Create a PostCSS Plugin

This repo is an example for how to create PostCSS Plugin using Gulp.

## Steps

- Crate a new gir repo and the clone it to your local environment
- Open your IDE with the new repo
- Create a new package.json by execute the command `npm init -y`
- Install the following packages by execute this command `npm i postcss gulp gulp-postcss postcss-scss`
- Create a new `gulpfile.js` and `plugin.js` file on the root of the project 
- Now we can implement our plugin code, our Gulp task code

### plugin.js
```javascript
'use strict';

const postcss = require('postcss');
const chalk = require('chalk');
const map = {
    "--red-color": "--primary-clr",
    "--yellow-color": "--secondary-clr",
    "--green-color": "--secondary-dark-green-clr",
    "--black-color": "--neutral-darker-clr",
};

module.exports = postcss.plugin('postcss-replace-css-var-name', () => {
    return (root, result) => {
        const path = root.source.input.file.replace(/.*test-plugin/, 'test-plugin');
        root.walkRules((rule) => {
            rule.walkDecls((decl) => {
                const regexp = /--[a-zA-Z0-9\-]+/i;
                let val = decl.value.match(regexp);
                if (val && val.length && map[val[0]]) {
                    console.log('Replace', chalk.red(val[0]), 'to', chalk.green(map[val[0]]), 'under this path:', chalk.blue(path));
                    // replace old css value with the new one
                    decl.value = decl.value.replace(regexp, map[val[0]]);
                }
            });
        });
    };
});

```

### gulpfile.js
```javascript
'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postScss = require('postcss-scss');
const plugin = require('./plugin'); // our plugin

gulp.task('scss', () => {
    return gulp.src('./test-plugin/src/**/*.scss')
        .pipe(postcss([plugin], { parser: postScss }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});
```
