const glob = require('glob');
const minimatch = require('minimatch');
const path = require('path');
const manifest = require('../manifest.json');
const isFile = require('../scripts/utils/is-file');
const clamp = require('../scripts/utils/clamp');

function convertJpgQual(rawJpgQual) {
    return clamp(Math.floor(rawJpgQual), 10, 100);
}

function convertPngQual(rawPngQual) {
    const min = clamp(rawPngQual - 10, 10, 90);
    const max = clamp(min + 20, 20, 100);

    return [min * 0.01, max * 0.01];
}

function getConfig(qual, test) {
    const config = {
        test,
        use: {
            loader: 'image-webpack-loader',
        },
    };

    switch (path.extname(test)) {
        case '.jpg':
            config.use.options = {
                mozjpeg: {
                    progressive: true,
                    quality: convertJpgQual(qual),
                },
            };
            break;

        case '.png':
            config.use.options = {
                optipng: {
                    enabled: true,
                },
                pngquant: {
                    quality: convertPngQual(qual),
                    speed: 1,
                },
            };
            break;

        default:
    }

    return config;
}

module.exports = () => {
    const { default: def } = manifest.compression;
    const compression = Object.assign(def);
    const paths = Object.keys(compression);
    const map = paths.map((p) => ({ source: p, files: glob.sync(p).filter((f) => isFile(f)) }));

    map.forEach((m1) => {
        map.forEach((m2) => {
            if (m1 === m2) {
                return;
            }
            if (minimatch(m1.source, m2.source)) {
                m1.files.forEach((m1file) => {
                    const found = m2.files.find((m2file) => m2file === m1file);
                    if (found) {
                        m2.files.splice(m2.files.indexOf(found), 1);
                    }
                });
            }
        });
    });

    const result = map
        .filter((m) => m.files.length > 0)
        .reduce((acc, m) => {
            const { source, files } = m;
            files.forEach((fileName) => {
                acc.push(getConfig(compression[source], path.resolve(fileName)));
            });
            return acc;
        }, []);

    return result;
};
