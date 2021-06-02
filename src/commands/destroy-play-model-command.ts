import { store } from '../models/store';

export const destroyPlayModelCommand = (): void => {
    store.destroyPlayModel();
};
