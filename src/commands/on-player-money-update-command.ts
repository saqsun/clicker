import { store } from '../models/store';

export const onPlayerMoneyUpdateCommand = (money: number): void => {
    const { levelIndex } = store.game;

    store.player.updateIsUpgradeable();

    if (store.game.friends) {
        store.game.friends.updateActivatableFriends(levelIndex, money);
        store.game.friends.updateUpgradeableFriends(money);
        store.game.friends.updatePassiveFriendsFriends(levelIndex, money);
    }
};
