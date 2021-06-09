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

export enum GameModelEvent {
    levelUpdate = 'GameModelLevelUpdate',
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
    damageUpdate = 'PlayerModelDamageUpdate',
    moneyUpdate = 'PlayerModelMoneyUpdate',
}

export enum StoreEvent {
    playerUpdate = 'StorePlayerUpdate',
    gameUpdate = 'StoreGameUpdate',
}
