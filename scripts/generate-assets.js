const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');
const getDirectories = require('./utils/get-directories');
const getFilesRecursively = require('./utils/get-files-recursively');
const getFiles = require('./utils/get-files');
const trimExt = require('./utils/trim-ext');
const camelize = require('./utils/camelize');

const cwd = process.cwd();

function saveFile(name, filename, data, auxiliaryData = '') {
    let url = path.resolve(path.join('src', 'assets', `${filename}.ts`));
    writeFileSync(
        url,
        `/* eslint-disable @typescript-eslint/naming-convention */
            ${auxiliaryData}
            export const ${name} = {${data}}`,
        'utf-8',
    );
    execSync(`npx prettier --write ${url}`);
}

function processSounds(p) {
    const files = getFiles(p).filter((f) => path.extname(f) === '.json');
    let sounds = '';
    const value = files.reduce((str, sound) => {
        const soundStr = readFileSync(sound, 'utf-8');
        const soundJson = JSON.parse(soundStr);
        sounds += Object.keys(soundJson).reduce((acc, s) => `${acc}'${camelize(s)}':'${s}',`, '');
        const m = sound.replace(cwd, '../..');
        str += `'spritemap':require('${m}'),`;
        str += `'url':require('${m.replace('json', 'mp3')}'),`;
        return str;
    }, '');

    return [value, sounds];
}

function processSpines(p) {
    const files = getFilesRecursively(p);
    let spines = '';
    const value = files.reduce((str, spine) => {
        const spineStr = readFileSync(spine, 'utf-8');
        const spineJson = JSON.parse(spineStr);
        const { animations } = spineJson;
        const animationsString = Object.keys(animations).reduce(
            (acc, animation) => `${acc}'${camelize(animation)}':'${animation}',`,
            '',
        );
        const key = path.basename(spine, path.extname(spine));
        const value = `require('${spine.replace(cwd, '../..')}')`;
        spines += `'${key}': {
            'animations':{${animationsString}},
            'skeleton': null as import('pixi-spine').SkeletonData,
        },`;
        str += `'${key}':${value},`;
        return str;
    }, '');

    return [value, spines];
}

function processParticles(p) {
    const files = getFiles(p);
    let particles = '';
    const value = files.reduce((str, particle) => {
        const key = path.basename(particle, path.extname(particle));
        const value = particle.replace(cwd, '../..');
        particles += `'${key}':assets.particles['${key}'],`;
        str += `'${key}':require('${value}'),`;
        return str;
    }, '');
    return [value, particles];
}

function processFonts(p) {
    const files = getFiles(p);
    let css = '';
    let googleFonts = '';
    let fonts = '';
    files.forEach((f) => {
        switch (path.extname(f)) {
            case '.woff':
            case '.woff2':
                const key = path.basename(f, path.extname(f));
                fonts += `'${key}':'${key}',`;
                break;
            case '.json':
                const fontStr = readFileSync(f, 'utf-8');
                const fontJson = JSON.parse(fontStr);
                fontJson.forEach((f) => (fonts += `'${f.family}':'${f.family}',`));
                googleFonts = `require('${f.replace(cwd, '../..')}')`;
                break;
            case '.scss':
                css = `require('${f.replace(cwd, '../..')}').default`;
                return;
        }
    });
    return [css, googleFonts, fonts];
}

function processAtlases(p) {
    const files = getFiles(p).filter((f) => path.extname(f) === '.json');
    let atlases = '';

    const value = files.reduce((str, jsonFile) => {
        const key = path.basename(jsonFile, path.extname(jsonFile));
        const jsonStr = readFileSync(jsonFile, 'utf-8');
        const json = JSON.parse(jsonStr);
        const { meta, frames } = json;
        const value = `{
            json: require('${jsonFile.replace(cwd, '../..')}'),
            image: require('${jsonFile.replace(cwd, '../..').replace('.json', path.extname(meta.image))}'),
        }`;

        if (jsonFile.includes('.png')) {
            str += `'${key}':${value},`;
            atlases += `'${trimExt(key)}': '${key}',`;
        } else {
            atlases += Object.keys(frames).reduce((str, f) => (str += `'${trimExt(f)}':'${f}',`), '');
            str += `'${key}':${value},`;
        }

        return str;
    }, '');
    return [value, atlases];
}

module.exports = () => {
    const directories = getDirectories(path.resolve('assets'));

    let textures = '';
    let sounds = '';
    let particles = '';
    let fonts = '';
    let spines = '';

    let assets = `
    atlases: {__atlases__},
    particles: {__particles__},
    spines: {__spines__},
    ...((): { fonts: { config: WebFont.Config } }  => {
        const css = __css__;
        const googleFonts = __googleFonts__;
        const families = css.families.length === 2 ? [] : (new Function('return [' + css.families + ']')() as string[]);
        const config: { custom?: Custom; google?: Google } = {};
        if (families.length > 0) {
            config.custom = {
                families,
            };
        }
        if (googleFonts.length > 0) {
            const googleFontFamilies = googleFonts.map(
                (font: { family: string; variants: string[]; subsets: string[] }) =>
                    \`\${font.family}:\${font.variants && font.variants.length > 0 ? font.variants.join(',') : '400'}:\${
        font.subsets && font.subsets.length > 0 ? font.subsets.join(',') : 'latin-ext'
    }\`,
            );
            config.google = {
                families: googleFontFamilies,
            };
        }

        return { fonts: { config: { ...config } } };
    })(),
    ...(() => {
        return {
            sound: {__sound__},
        };
    })(),
    `;

    directories.forEach((d) => {
        const type = path.basename(d);
        switch (type) {
            case 'sounds':
                {
                    const processedSounds = processSounds(d);
                    assets = assets.replace(`__sound__`, processedSounds[0]);
                    sounds = processedSounds[1];
                }
                break;
            case 'particles':
                {
                    const processedParticles = processParticles(d);
                    assets = assets.replace(`__particles__`, processedParticles[0]);
                    particles = processedParticles[1];
                }
                break;
            case 'spines':
                {
                    const processedSpines = processSpines(d);
                    assets = assets.replace(`__spines__`, processedSpines[0]);
                    spines = processedSpines[1];
                }
                break;
            case 'atlases':
                {
                    const processedAtlases = processAtlases(d);
                    assets = assets.replace(`__atlases__`, processedAtlases[0]);
                    textures += processedAtlases[1];
                }
                break;
            case 'localization':
                break;
            case 'fonts':
                {
                    const processedFonts = processFonts(d);
                    assets = assets.replace(`__css__`, processedFonts[0]);
                    assets = assets.replace(`__googleFonts__`, processedFonts[1]);
                    fonts = processedFonts[2];
                }
                break;
            default:
                throw Error(`Unknown asset type "${type}"`);
        }
    });
    assets = assets
        .replace(`__sound__`, '')
        .replace(`__particles__`, '')
        .replace(`__spines__`, '')
        .replace(`__atlases__`, '')
        .replace(`__css__`, '')
        .replace(`__googleFonts__`, '');

    saveFile('assets', 'index', assets, `import { Custom, Google } from "webfontloader";\n`);
    saveFile('textures', 'textures', textures);
    saveFile('sounds', 'sounds', sounds);
    saveFile('particles', 'particles', particles, `import { assets } from '.';\n`);
    saveFile('fonts', 'fonts', fonts);
    saveFile('spines', 'spines', spines);
};
