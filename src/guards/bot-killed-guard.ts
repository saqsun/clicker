import { BotModel } from '../models/bot-model';

export const botKilledGuard = (bot: BotModel): boolean => {
    return bot.defeat;
};
