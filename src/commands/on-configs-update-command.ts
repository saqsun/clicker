import { playerConfig } from '../constants/configs/player-configs';
import { store } from '../models/store';

export const onConfigsUpdateCommand = (): void => {
    const { player, game } = store;
    const { friends, levelIndex } = game;
    player.damage = playerConfig.damage;
    player.money = playerConfig.money;
    player.updateCost = playerConfig.updateCost;
    player.dmgPlus = playerConfig.dmgPlus;

    friends.updateConfig();

    store.player.updateIsUpgradeable();
    store.game.friends.updateActivatableFriends(levelIndex, playerConfig.money);
    store.game.friends.updateUpgradeableFriends(playerConfig.money);
    store.game.friends.updatePassiveFriendsFriends(levelIndex, playerConfig.money);
};
