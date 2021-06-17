import { store } from '../models/store';

export const onMenuItemActiveButtonClickCommand = (_friendUuid: string): void => {
    const { player, game } = store;
    const friendModel = game.friends.getFriendByUuid(_friendUuid);
    const { cost } = friendModel;
    friendModel.isActive = true;
    friendModel.cost += Math.ceil((cost * 20) / 100);
    friendModel.startAction();
    player.credit(-cost);
};
