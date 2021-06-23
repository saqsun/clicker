import { ICellConfig } from '@armathai/pixi-grid';

export const getLevelGridLandscapeConfig = (): ICellConfig => {
    return {
        debug: { color: 0x989494 },
        name: 'level',
        cells: [
            {
                name: 'actor',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

export const getLevelGridPortraitConfig = (): ICellConfig => {
    return {
        debug: { color: 0x989494 },
        name: 'level',
        cells: [
            {
                name: 'actor',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
