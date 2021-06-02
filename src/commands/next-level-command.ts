import { store } from '../models/store';

export const nextLevelCommand = (): void => {
    const { game } = store;
    game.nextLevel();
};
