import { store } from '../models/store';

export const onGameLevelUpdateCommand = (): void => {
    const { levelIndex } = store.game;
    const { money } = store.player;

    if (store.game.friends) {
        store.game.friends.updateActivatableFriends(levelIndex, money);
        store.game.friends.updateUpgradeableFriends(money);
        store.game.friends.updatePassiveFriendsFriends(money);
    }
};
