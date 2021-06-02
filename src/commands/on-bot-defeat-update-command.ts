import { lego } from '@armathai/lego';
import { botKilledGuard } from '../guards/bot-killed-guard';
import { lastBotGuard } from '../guards/last-bot-guard';
import { store } from '../models/store';
import { nextBossCommand } from './next-boss-command';
import { nextBotCommand } from './next-bot-command';

export const onBotDefeatUpdateCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { bot } = level;
    lego.command
        .payload(bot)
        .guard(botKilledGuard, lastBotGuard)
        .execute(nextBossCommand)

        .payload(bot)
        .guard(botKilledGuard, lego.not(lastBotGuard))
        .execute(nextBotCommand);
};
