import { lego } from '@armathai/lego';
import { lastLevelGuard } from '../guards/last-level-guard';
import { store } from '../models/store';
import { nextLevelCommand } from './next-level-command';
import { takeBotMoneyCommand } from './take-bot-money-command';

export const onBossKilledCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { boss } = level;
    lego.command

        .payload(boss)
        .execute(takeBotMoneyCommand)

        .payload(boss)
        .guard(lego.not(lastLevelGuard))
        .execute(nextLevelCommand);
};
