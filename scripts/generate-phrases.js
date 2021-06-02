const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { exec } = require('child_process');
const getFiles = require('./utils/get-files');

module.exports = () => {
    const files = getFiles(path.join('assets', 'localization')).filter((f) => {
        return f.match(/.*\.(json)/gi);
    });

    const phrases = files.reduce((pp, f) => {
        const p = JSON.parse(readFileSync(path.resolve(f), 'utf8'));
        return pp + Object.keys(p).reduce((pv, pk) => pv + `"${pk}":"${pk}",`, '');
    }, '');
    let url = path.resolve(path.join('src', 'localization', `phrases.ts`));
    writeFileSync(
        url,
        `/* eslint-disable @typescript-eslint/naming-convention */
        
            export const phrases = {${phrases}}`,
        'utf-8',
    );
    exec(`npx prettier --write ${url}`);
};
