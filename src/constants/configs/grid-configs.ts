import { ICellConfig } from '@armathai/pixi-grid';
import { lp } from '../../utils';
import { getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig } from './grid/background-grid-configs';
import { getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig } from './grid/foreground-grid-configs';
import { getGameGridLandscapeConfig, getGameGridPortraitConfig } from './grid/game-grid-configs';
import { getMainGridLandscapeConfig, getMainGridPortraitConfig } from './grid/main-grid-configs';
import { getUIGridLandscapeConfig, getUIGridPortraitConfig } from './grid/ui-grid-configs';

export const getMainGridConfig = (): ICellConfig => {
    return lp(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
};

export const getBackgroundGridConfig = (): ICellConfig => {
    return lp(getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig).call(null);
};

export const getForegroundGridConfig = (): ICellConfig => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

export const getUIGridConfig = (): ICellConfig => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

export const getGameGridConfig = (): ICellConfig => {
    return lp(getGameGridLandscapeConfig, getGameGridPortraitConfig).call(null);
};
