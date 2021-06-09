import { lego } from '@armathai/lego';
import { botKilledGuard } from '../guards/bot-killed-guard';
import { store } from '../models/store';
import { onBotKilledCommand } from './on-bot-killed-command';

export const onBotDefeatUpdateCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { bot } = level;
    lego.command.payload(bot).guard(botKilledGuard).execute(onBotKilledCommand);
};
