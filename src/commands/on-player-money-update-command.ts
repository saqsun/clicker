import { store } from '../models/store';

export const onPlayerMoneyUpdateCommand = (money: number): void => {
    const { levelIndex } = store.game;

    if (store.game.friends) {
        store.game.friends.updateActivatableFriends(levelIndex, money);
        store.game.friends.updateUpgradeableFriends(money);
        store.game.friends.updatePassiveFriendsFriends(money);
    }
};
