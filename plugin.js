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
