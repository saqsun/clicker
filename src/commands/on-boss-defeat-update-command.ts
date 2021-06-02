import { lego } from '@armathai/lego';
import { bossKilledGuard } from '../guards/boss-killed-guard';
import { lastLevelGuard } from '../guards/last-level-guard';
import { store } from '../models/store';
import { nextLevelCommand } from './next-level-command';

export const onBossDefeatUpdateCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { boss } = level;
    lego.command.payload(boss).guard(bossKilledGuard, lego.not(lastLevelGuard)).execute(nextLevelCommand);
};
