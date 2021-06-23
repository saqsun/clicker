export enum BossModelEvent {
    hpUpdate = 'BossModelHpUpdate',
    defeatUpdate = 'BossModelDefeatUpdate',
    reviveTimerCompleteUpdate = 'BossModelReviveTimerCompleteUpdate',
    timeUpdate = 'BossModelTimeUpdate',
}

export enum BotModelEvent {
    hpUpdate = 'BotModelHpUpdate',
    moneyUpdate = 'BotModelMoneyUpdate',
    defeatUpdate = 'BotModelDefeatUpdate',
}

export enum FriendModelEvent {
    indexUpdate = 'FriendModelIndexUpdate',
    iconColorUpdate = 'FriendModelIconColorUpdate',
    isActiveUpdate = 'FriendModelIsActiveUpdate',
    costUpdate = 'FriendModelCostUpdate',
    dmgPlusUpdate = 'FriendModelDmgPlusUpdate',
    damageUpdate = 'FriendModelDamageUpdate',
    nameUpdate = 'FriendModelNameUpdate',
    activationLevelUpdate = 'FriendModelActivationLevelUpdate',
    stateUpdate = 'FriendModelStateUpdate',
}

export enum FriendsModelEvent {
    friendsUpdate = 'FriendsModelFriendsUpdate',
    upgradeableFriendsUpdate = 'FriendsModelUpgradeableFriendsUpdate',
    activatableFriendsUpdate = 'FriendsModelActivatableFriendsUpdate',
    passiveFriendsUpdate = 'FriendsModelPassiveFriendsUpdate',
}

export enum GameModelEvent {
    levelUpdate = 'GameModelLevelUpdate',
    friendsUpdate = 'GameModelFriendsUpdate',
    levelIndexUpdate = 'GameModelLevelIndexUpdate',
}

export enum LevelModelEvent {
    bossUpdate = 'LevelModelBossUpdate',
    botUpdate = 'LevelModelBotUpdate',
    botIndexUpdate = 'LevelModelBotIndexUpdate',
}

export enum ObservableModelEvent {
    uuidUpdate = 'ObservableModelUuidUpdate',
}

export enum PlayerModelEvent {
    dmgPlusUpdate = 'PlayerModelDmgPlusUpdate',
    isUpgradeableUpdate = 'PlayerModelIsUpgradeableUpdate',
    damageUpdate = 'PlayerModelDamageUpdate',
    updateCostUpdate = 'PlayerModelUpdateCostUpdate',
    moneyUpdate = 'PlayerModelMoneyUpdate',
}

export enum StoreEvent {
    playerUpdate = 'StorePlayerUpdate',
    gameUpdate = 'StoreGameUpdate',
}
