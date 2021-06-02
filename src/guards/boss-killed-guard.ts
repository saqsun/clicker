import { BossModel } from '../models/boss-model';

export const bossKilledGuard = (bot: BossModel): boolean => {
    return bot.defeat;
};
