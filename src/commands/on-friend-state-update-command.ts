import { lego } from '@armathai/lego';
import { FriendState } from '../models/friend-model';
import { store } from '../models/store';
import { hitBotCommand } from './hit-bot-command';

export const onFriendStateUpdateCommand = (state: FriendState, preState: FriendState, uuid: string): void => {
    switch (state) {
        case FriendState.action:
            const { damage } = store.game.friends.getFriendByUuid(uuid);
            const { level } = store.game;
            const { bot, boss } = level;
            bot && lego.command.payload(bot, damage).execute(hitBotCommand);
            boss && lego.command.payload(boss, damage).execute(hitBotCommand);
            break;

        default:
            break;
    }
};
