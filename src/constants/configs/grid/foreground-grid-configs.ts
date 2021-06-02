import { CellAlign, ICellConfig } from '@armathai/pixi-grid';

export const getForegroundGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xd95027 },
        name: 'foreground',
        cells: [
            {
                name: 'logo',
                bounds: { x: 0, height: 0.2 },
                offset: { x: 40 },
                align: CellAlign.leftCenter,
            },
            {
                name: 'sound',
                bounds: { x: 0, height: 0.1 },
                offset: { x: 40 },
                align: CellAlign.leftCenter,
            },
            {
                name: 'tutorial',
                bounds: { x: 0, y: 0.7 },
            },
            {
                name: 'cta_logo',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

export const getForegroundGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xd95027 },
        name: 'foreground',
        cells: [
            {
                name: 'logo',
                bounds: { x: 0, height: 0.14 },
            },
            {
                name: 'sound',
                bounds: { x: 0, height: 0.06 },
            },
            {
                name: 'tutorial',
                bounds: { x: 0, y: 0.5 },
            },
            {
                name: 'cta_logo',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
