const path = require('path');
const audiosprite = require('audiosprite');
const { readdirSync, writeFileSync } = require('fs');
const { exec } = require('child_process');

module.exports = () => {
    return new Promise((resolve, reject) => {
        const outputPath = path.join('assets', 'sounds');
        const inputPath = path.join('assets-raw', 'sounds');
        const dirCont = readdirSync(inputPath);
        const slices = dirCont
            .filter((elm) => {
                return elm.match(/.*\.(mp3|ogg|wav)/gi);
            })
            .map((elm) => path.join(inputPath, elm));
        if (slices.length === 0) {
            resolve();
            return;
        }
        audiosprite(
            slices,
            {
                output: path.join(outputPath, 'spritemap'),
                export: 'mp3',
                format: 'jukebox',
                loop: 'theme',
                bitrate: '32',
            },
            (err, obj) => {
                if (err) reject(err);
                const jsonPath = path.join(outputPath, 'spritemap.json');
                writeFileSync(jsonPath, JSON.stringify(obj.spritemap, null, 2), 'utf8');
                exec(`npx prettier --write ${jsonPath}`);
                resolve();
            },
        );
    });
};
