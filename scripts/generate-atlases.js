const path = require('path');
const { readdirSync, writeFileSync, readFileSync, existsSync } = require('fs');
const { packAsync } = require('free-tex-packer-core');
const getFilesRecursively = require('./utils/get-files-recursively');
const isDirectory = require('./utils/is-directory');
const manifest = require('../manifest.json');
const { variation } = manifest;

const imageVariants = variation.image;
const moduleVariants = variation.module;

module.exports = async () => {
    const removeFirstFolderInString = (str) => {
        return str.substring(str.indexOf('/') + 1);
    };
    const imagesToExclude = new Set();
    const imageAliases = new Map();

    Object.keys(moduleVariants).forEach((key) => {
        const module = moduleVariants[key];
        const { active } = module;
        const activeOptionAssets = module.options[active].assets;
        const moduleAssetsToExclude = Array.from(
            Object.keys(module.options).reduce((assets, k) => {
                module.options[k].assets.forEach((a) => assets.add(a));
                return assets;
            }, new Set()),
        ).filter((a) => !activeOptionAssets.includes(a));
        moduleAssetsToExclude.forEach((a) => imagesToExclude.add(a));
    });

    Object.keys(imageVariants).forEach((key) => {
        const image = imageVariants[key];
        const { active, options } = image;
        let alias = key;
        if (active !== -1) {
            alias = options[active];
        }
        imageAliases.set(alias, key);
        options.filter((o) => o !== alias).forEach((o) => imagesToExclude.add(removeFirstFolderInString(o)));
        if (imagesToExclude.has(removeFirstFolderInString(key))) {
            imagesToExclude.add(removeFirstFolderInString(alias));
        }
        if (alias !== key) {
            imagesToExclude.add(removeFirstFolderInString(key));
        }
    });

    const packDefaultOptions = {
        width: 4096,
        height: 4096,
        fixedSize: false,
        powerOfTwo: false,
        padding: 2,
        extrude: 1,
        allowRotation: true,
        detectIdentical: true,
        allowTrim: true,
        trimMode: 'trim',
        alphaThreshold: 0,
        removeFileExtension: false,
        prependFolderName: true,
        base64Export: false,
        scale: 1,
        scaleMethod: 'BILINEAR',
        packer: 'OptimalPacker',
        exporter: 'Pixi',
        filter: 'none',
    };

    const outputPath = path.join('assets', 'atlases');
    const inputPath = path.join('assets-raw', 'atlases');
    if (!existsSync(inputPath)) {
        return;
    }
    const atlases = readdirSync(inputPath).filter((f) => isDirectory(path.join(inputPath, f)));
    for await (const a of atlases) {
        const spritesheetRoot = path.join(inputPath, a);
        const files = getFilesRecursively(spritesheetRoot).filter((f) => {
            return f.match(/.*\.(png|jpe?g)/gi);
        });
        let textureFormat = 'jpg';
        const images = [];
        files.forEach((f) => {
            let imagePath = f.replace(path.join(spritesheetRoot, '/'), '');
            const imageKey = `${a}/${imagePath}`;
            if (imagesToExclude.has(imagePath)) {
                return;
            }
            if (imageAliases.has(imageKey)) {
                imagePath = removeFirstFolderInString(imageAliases.get(imageKey));
            }
            if (textureFormat !== 'png') {
                textureFormat = f.split('.').pop() === 'png' ? 'png' : 'jpg';
            }
            images.push({
                path: imagePath,
                contents: readFileSync(f),
            });
        });

        const packFiles = await packAsync(images, {
            ...packDefaultOptions,
            textureName: `${a}`,
            textureFormat,
        });
        packFiles.forEach((packFile) => {
            writeFileSync(path.join(outputPath, packFile.name), packFile.buffer);
        });
    }
};
