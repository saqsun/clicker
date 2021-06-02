export let playerConfig: PlayerConfig = {
    damage: 1,
};

export const updatePlayerConfig = (newPlayerConfig: PlayerConfig): void => {
    playerConfig = { ...playerConfig, ...newPlayerConfig };
};
