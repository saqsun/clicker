import { store } from '../models/store';

export const reviveBossCommand = (): void => {
    const { level } = store.game;
    level.reviveBoss();
};
