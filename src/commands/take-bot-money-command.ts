import { BotModel } from '../models/bot-model';
import { store } from '../models/store';

export const takeBotMoneyCommand = (bot: BotModel): void => {
    const { player } = store;
    const { money } = bot;
    player.credit(money);
};
