import { lego } from '@armathai/lego';
import { store } from '../models/store';
import { hitBotCommand } from './hit-bot-command';

export const onBotClickCommand = (): void => {
    const { damage } = store.player;
    const { level } = store.game;
    const { bot } = level;
    lego.command.payload(bot, damage).execute(hitBotCommand);
};
