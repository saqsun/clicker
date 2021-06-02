import { ICellConfig } from '@armathai/pixi-grid';

export const getGameGridLandscapeConfig = (): ICellConfig => {
    return {
        debug: { color: 0x2fc900 },
        name: 'game',
        cells: [
            {
                name: 'level',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: { x: 0.2, y: 0.16, width: 0.6, height: 0.7 },
            },
        ],
    };
};

export const getGameGridPortraitConfig = (): ICellConfig => {
    return {
        debug: { color: 0x2fc900 },
        name: 'game',
        cells: [
            {
                name: 'level',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                padding: { x: 0.05, y: 0.2, width: 0.9, height: 0.6 },
            },
        ],
    };
};
