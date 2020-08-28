'use strict';

const postcss = require('postcss');
const map = {
    '--primary-dark-color': '--ofir'
};

module.exports = postcss.plugin('postcss-hex-to-scss-var', () => {
    return (root, result) => {
        root.walkRules((rule) => {
            rule.walkDecls((decl) => {
                // const regexp = /\$[0-9a-zA-Z\-]+/i;
                const regexp = /--primary-dark-color/i;

                let val = decl.value.match(regexp);
                if (val && val.length && map[val[0]]) {
                    // console.log(val[0]);
                    decl.value = decl.value.replace(regexp, map[val[0]]);
                }
            });
        });

    };
});
