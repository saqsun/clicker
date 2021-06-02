import { CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getBackgroundGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xd95027 },
        name: 'background',
        cells: [
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};

export const getBackgroundGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0xd95027 },
        name: 'background',
        cells: [
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill,
            },
        ],
    };
};
