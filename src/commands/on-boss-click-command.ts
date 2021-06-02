import { lego } from '@armathai/lego';
import { store } from '../models/store';
import { hitBotCommand } from './hit-bot-command';

export const onBossClickCommand = (): void => {
    const { damage } = store.player;
    const { level } = store.game;
    const { boss } = level;
    lego.command.payload(boss, damage).execute(hitBotCommand);
};
