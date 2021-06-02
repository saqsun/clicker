import { store } from '../models/store';

export const nextBossCommand = (): void => {
    const { level } = store.game;
    level.setBoss();
};
