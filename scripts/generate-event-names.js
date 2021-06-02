const { resolve, join } = require('path');
const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { execSync } = require('child_process');
const getFilesRecursively = require('./utils/get-files-recursively');

function getContentFromPath(path) {
    return readFileSync(path, { encoding: 'utf8' });
}

function getContentsAfterKeyword(str, regex) {
    let result;
    const ii = [];

    while ((result = regex.exec(str))) {
        ii.push(result.index);
    }

    return ii.map((el, i) => str.substring(el, ii[i + 1]));
}

function getGetterNames(str) {
    return getContentsAfterKeyword(str, /(?<=get[ ]{1,})([a-zA-Z_${1}][a-zA-Z0-9_$]+)(?=\()/gi).map(
        (c) => c.split('(').filter((name) => name)[0],
    );
}

function getClassName(str) {
    return getContentsAfterKeyword(str, /class /gi).map((c) => c.split(' ').filter((name) => name)[1]);
}

function getClassNamesAndGetters(str) {
    const classes = getContentsAfterKeyword(str, /class /gi);
    return classes.map((c) => {
        return { className: getClassName(c), getters: getGetterNames(c) };
    });
}

module.exports = () => {
    let result = ``;
    const paths = getFilesRecursively(join('src', 'models'));
    const contents = paths.map((path) => getContentFromPath(path));

    for (const c of contents) {
        const entries = getClassNamesAndGetters(c);

        for (const e of entries) {
            const { className, getters } = e;

            if (!getters.length) {
                continue;
            }

            result += `export enum ${className}Event {\n`;

            for (const g of getters) {
                const G = g[0].toUpperCase() + g.slice(1);
                result += `    ${g}Update = '${className}${G}Update',\n`;
            }

            result += `  }\n\n`;
        }
    }

    const url = join('src', 'events', 'model.ts');
    writeFileSync(url, result, 'utf-8');
    execSync(`npx prettier --write ${url}`);
};
