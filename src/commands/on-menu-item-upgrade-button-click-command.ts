import { store } from '../models/store';

export const onMenuItemUpgradeButtonClickCommand = (_friendUuid: string): void => {
    const { player, game } = store;
    const friendModel = game.friends.getFriendByUuid(_friendUuid);
    const { cost } = friendModel;
    friendModel.damage += 1;
    friendModel.cost += Math.ceil((cost * 20) / 100);

    player.credit(-cost);
};
