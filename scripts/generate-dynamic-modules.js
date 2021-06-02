const path = require('path');
const { writeFileSync } = require('fs');
const { exec } = require('child_process');

const manifest = require('./../manifest.json');
const { variation } = manifest;

const moduleVariants = variation.module;

module.exports = () => {
    let modulesDTS = '/* eslint-disable @typescript-eslint/naming-convention */\n\n';

    const modules = Object.keys(moduleVariants).reduce((moduleObj, key) => {
        const module = moduleVariants[key];
        const { active } = module;
        const { path: modulePath } = module.options[active];
        const moduleKey = `__${key.toUpperCase()}_MODULE__`;
        modulesDTS += `declare let ${moduleKey}: string;\n`;
        const newModuleObj = { ...moduleObj };
        newModuleObj[moduleKey] = JSON.stringify(path.resolve(modulePath));
        return newModuleObj;
    }, {});

    const modulesDTSPath = path.resolve('typings/modules.d.ts');
    writeFileSync(modulesDTSPath, modulesDTS, 'utf8');
    exec(`npx prettier --write ${modulesDTSPath}`);
    return modules;
};
