import { store } from '../models/store';

export const nextBotCommand = (): void => {
    const { level } = store.game;
    level.nextBot();
};
