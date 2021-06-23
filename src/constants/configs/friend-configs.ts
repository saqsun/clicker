export let friendConfigs: FriendConfigs = [
    { cost: 13, damage: 5, activationLevel: 2, actionTime: 3, name: 'friend 1', dmgPlus: 1 },
    { cost: 15, damage: 10, activationLevel: 8, actionTime: 3, name: 'friend 2', dmgPlus: 1 },
    { cost: 60, damage: 15, activationLevel: 13, actionTime: 3, name: 'friend 3', dmgPlus: 1 },
    { cost: 80, damage: 20, activationLevel: 18, actionTime: 3, name: 'friend 4', dmgPlus: 1 },
    { cost: 150, damage: 25, activationLevel: 23, actionTime: 3, name: 'friend 5', dmgPlus: 1 },
    { cost: 200, damage: 30, activationLevel: 28, actionTime: 3, name: 'friend 6', dmgPlus: 1 },
    { cost: 300, damage: 35, activationLevel: 33, actionTime: 3, name: 'friend 7', dmgPlus: 1 },
    { cost: 400, damage: 40, activationLevel: 38, actionTime: 3, name: 'friend 8', dmgPlus: 1 },
    { cost: 600, damage: 45, activationLevel: 43, actionTime: 3, name: 'friend 9', dmgPlus: 1 },
    { cost: 800, damage: 50, activationLevel: 48, actionTime: 3, name: 'friend 10', dmgPlus: 1 },
];

export const updateLevelConfigs = (newFriendConfigs: FriendConfigs): void => {
    friendConfigs = newFriendConfigs;
};