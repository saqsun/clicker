/* eslint-disable @typescript-eslint/naming-convention */
import { Custom, Google } from 'webfontloader';

export const assets = {
    atlases: {},
    particles: {},
    spines: {},
    ...((): { fonts: { config: WebFont.Config } } => {
        const css = require('../../assets/fonts/index.scss').default;
        const googleFonts = require('../../assets/fonts/google-fonts.json');
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
                    `${font.family}:${font.variants && font.variants.length > 0 ? font.variants.join(',') : '400'}:${
                        font.subsets && font.subsets.length > 0 ? font.subsets.join(',') : 'latin-ext'
                    }`,
            );
            config.google = {
                families: googleFontFamilies,
            };
        }

        return { fonts: { config: { ...config } } };
    })(),
    ...(() => {
        return {
            sound: {},
        };
    })(),
};
