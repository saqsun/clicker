export let playerConfig: PlayerConfig = {
    damage: 1,
    money: 0,
    updateCost: 1,
    dmgPlus: 1,
};

export const updatePlayerConfig = (newPlayerConfig: PlayerConfig): void => {
    playerConfig = { ...playerConfig, ...newPlayerConfig };
};
