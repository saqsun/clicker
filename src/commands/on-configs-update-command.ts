import { playerConfig } from '../constants/configs/player-configs';
import { store } from '../models/store';

export const onConfigsUpdateCommand = (): void => {
    const { player } = store;
    player.damage = playerConfig.damage;
};
