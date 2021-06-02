/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ICellConfig } from '@armathai/pixi-grid';

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: game.viewBounds,
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: game.viewBounds,
    };
};
