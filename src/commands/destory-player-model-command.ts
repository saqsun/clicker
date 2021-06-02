import { store } from '../models/store';

export const destroyPlayerModelCommand = (): void => {
    store.destroyPlayerModel();
};
