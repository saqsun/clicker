import { store } from '../models/store';

export const onMenuItemUpgradeButtonClickCommand = (uuid: string): void => {
    const { player, game } = store;

    if (uuid === player.uuid) {
        player.updateDmg();
        player.credit(-player.updateCost);
        player.updateCost += Math.ceil((player.updateCost * 20) / 100);
    } else {
        const friendModel = game.friends.getFriendByUuid(uuid);
        const { cost, dmgPlus } = friendModel;
        friendModel.damage += dmgPlus;
        friendModel.cost += Math.ceil((cost * 20) / 100);

        player.credit(-cost);
    }
};
