import { ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        debug: { color: 0xc7d8e0 },
        name: 'ui',
        cells: [
            {
                name: 'level',
                bounds: { x: 0, width: 0.5, y: 0, height: 0.08 },
            },
            {
                name: 'wave',
                bounds: { x: 0.5, width: 0.5, y: 0, height: 0.08 },
            },
            {
                name: 'hp',
                bounds: { x: 0, y: 0.08, height: 0.08 },
            },
            {
                name: 'damage',
                bounds: { x: 0, y: 0.86, height: 0.07 },
            },
            {
                name: 'money',
                bounds: { x: 0, y: 0.93, height: 0.07 },
            },
            {
                name: 'menu',
                bounds: { x: 0, y: 0.705, height: 1 - 0.705 },
            },
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    return {
        debug: { color: 0xc7d8e0 },
        name: 'ui',
        cells: [
            {
                name: 'level',
                bounds: { x: 0, width: 0.5, y: 0, height: 0.035 },
            },
            {
                name: 'level',
                bounds: { x: 0, width: 0.5, y: 0, height: 0.035 },
            },
            {
                name: 'wave',
                bounds: { x: 0, width: 0.5, y: 0.035, height: 0.035 },
            },
            {
                name: 'damage',
                bounds: { x: 0.5, width: 0.5, y: 0, height: 0.035 },
            },
            {
                name: 'money',
                bounds: { x: 0.5, width: 0.5, y: 0.035, height: 0.035 },
            },
            {
                name: 'hp',
                bounds: { x: 0, y: 0.07, height: 0.035 },
            },
            {
                name: 'menu',
                bounds: { x: 0, y: 0.6 },
            },
        ],
    };
};
