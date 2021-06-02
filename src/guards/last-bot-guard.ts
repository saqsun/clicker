import { store } from '../models/store';

export const lastBotGuard = (): boolean => {
    const { game } = store;
    const { level } = game;
    return !level.hasNextBot();
};
