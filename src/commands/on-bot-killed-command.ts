import { lego } from '@armathai/lego';
import { lastBotGuard } from '../guards/last-bot-guard';
import { store } from '../models/store';
import { nextBossCommand } from './next-boss-command';
import { nextBotCommand } from './next-bot-command';
import { takeBotMoneyCommand } from './take-bot-money-command';

export const onBotKilledCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { bot } = level;
    lego.command

        .payload(bot)
        .execute(takeBotMoneyCommand)

        .payload(bot)
        .guard(lastBotGuard)
        .execute(nextBossCommand)

        .payload(bot)
        .guard(lego.not(lastBotGuard))
        .execute(nextBotCommand);
};
