import { store } from '../models/store';

export const onMenuItemActiveButtonClickCommand = (uuid: string): void => {
    const { player, game } = store;
    if (uuid === player.uuid) {
        return;
    } else {
        const friendModel = game.friends.getFriendByUuid(uuid);
        const { cost } = friendModel;
        friendModel.isActive = true;
        friendModel.cost += Math.ceil((cost * 20) / 100);
        friendModel.startAction();
        player.credit(-cost);
    }
};
