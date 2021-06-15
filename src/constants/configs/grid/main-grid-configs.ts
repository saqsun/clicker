/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ICellConfig } from '@armathai/pixi-grid';

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: game.viewBounds,
        padding: { y: 0.05 },
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: game.viewBounds,
        padding: { y: 0.05 },
    };
};
