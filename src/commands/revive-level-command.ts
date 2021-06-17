import { store } from '../models/store';

export const reviveLevelCommand = (): void => {
    const { level } = store.game;
    level.revive();
};
