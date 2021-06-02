const path = require('path');
const { writeFileSync } = require('fs');
const { exec } = require('child_process');
const getFiles = require('./utils/get-files');

const scss = `$families: (__families__);

@each $family in $families {
    @font-face {
        font-family: $family;
        src: url('./#{$family}.woff2') format('woff2');
    }
}

:export {
    families: if(length($families) > 0, $families, '');
}
`;

module.exports = () => {
    const files = getFiles(path.join('assets', 'fonts'))
        .filter((f) => {
            return f.match(/.*\.(woff|woff2)/gi);
        })
        .map((f) => `'${path.basename(f, `${path.extname(f)}`)}'`)
        .join(',');
    const css = scss.replace('__families__', files);
    const indexScss = path.join('assets', 'fonts', 'index.scss');
    writeFileSync(indexScss, css, 'utf8');
    exec(`npx prettier --write ${indexScss}`);
};
