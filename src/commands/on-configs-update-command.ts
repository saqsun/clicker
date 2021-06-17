import { playerConfig } from '../constants/configs/player-configs';
import { store } from '../models/store';

export const onConfigsUpdateCommand = (): void => {
    const { player, game } = store;
    const { friends } = game;
    player.damage = playerConfig.damage;
    player.money = playerConfig.money;

    friends.updateConfig();
};
