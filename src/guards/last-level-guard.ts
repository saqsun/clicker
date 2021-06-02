import { store } from '../models/store';

export const lastLevelGuard = (): boolean => {
    const { game } = store;
    return !game.hasNextLevel();
};
