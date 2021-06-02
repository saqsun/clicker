/* eslint-disable @typescript-eslint/naming-convention */

import { ConfigsPaneObservant } from '../observances/configs-pane-observant';

export const createObservancesCommand = async (): Promise<void> => {
    if (process.env.NODE_ENV !== 'production') {
        const { StatsObservant } = require('../observances/stats-observant');
        new StatsObservant();
    }

    new ConfigsPaneObservant();

    // lego.command.guard(soundGuard).execute(() => new SoundObservant());
};
