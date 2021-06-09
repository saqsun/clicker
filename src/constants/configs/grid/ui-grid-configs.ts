import { ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        debug: { color: 0x4287f5 },
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
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    return {
        debug: { color: 0x4287f5 },
        name: 'ui',
        cells: [
            {
                name: 'level',
                bounds: { x: 0, width: 0.5, y: 0, height: 0.15 },
            },
            {
                name: 'wave',
                bounds: { x: 0.5, width: 0.5, y: 0, height: 0.15 },
            },
            {
                name: 'hp',
                bounds: { x: 0, y: 0.15, height: 0.05 },
            },
            {
                name: 'damage',
                bounds: { x: 0, y: 0.8, height: 0.1 },
            },
            {
                name: 'money',
                bounds: { x: 0, y: 0.9, height: 0.1 },
            },
        ],
    };
};
