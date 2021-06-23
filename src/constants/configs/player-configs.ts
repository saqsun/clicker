export let playerConfig: PlayerConfig = {
    damage: 1,
    money: 0,
    updateCost: 0,
    dmgPlus: 0,
};

export const updatePlayerConfig = (newPlayerConfig: PlayerConfig): void => {
    playerConfig = { ...playerConfig, ...newPlayerConfig };
};
