import { lego } from '@armathai/lego';
import { bossKilledGuard } from '../guards/boss-killed-guard';
import { store } from '../models/store';
import { onBossKilledCommand } from './on-boss-killed-command';

export const onBossDefeatUpdateCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { boss } = level;
    lego.command.payload(boss).guard(bossKilledGuard).execute(onBossKilledCommand);
};
