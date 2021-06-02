export enum BossModelEvent {
    hpUpdate = 'BossModelHpUpdate',
    defeatUpdate = 'BossModelDefeatUpdate',
}

export enum BotModelEvent {
    hpUpdate = 'BotModelHpUpdate',
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
}

export enum StoreEvent {
    playerUpdate = 'StorePlayerUpdate',
    gameUpdate = 'StoreGameUpdate',
}
