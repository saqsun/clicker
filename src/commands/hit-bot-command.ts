import { BotModel } from '../models/bot-model';

export const hitBotCommand = (currentBot: BotModel, damage: number): void => {
    currentBot.hit(damage);
};
