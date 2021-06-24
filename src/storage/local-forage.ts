import localforage from 'localforage';
import { friendsConfig, updateFriendsConfig } from '../constants/configs/friends-config';
import { levelConfigs, updateLevelConfigs } from '../constants/configs/level-configs';
import { playerConfig, updatePlayerConfig } from '../constants/configs/player-configs';

export class LocalForage {
    private static _version = 2;
    private _loading: boolean;

    public constructor() {
        localforage.config({
            name: 'clicker',
            version: LocalForage._version,
            storeName: 'game', // Should be alphanumeric, with underscores.
        });
    }

    public get loading(): boolean {
        return this._loading;
    }

    public async load(): Promise<void> {
        this._loading = true;
        const [version, localforagePlayerConfig, localforageLevelConfigs, localforageFriendsConfig] = await Promise.all(
            [
                <number>(<unknown>localforage.getItem('version')),
                <PlayerConfig>(<unknown>localforage.getItem('playerConfig')),
                <LevelConfig[]>(<unknown>localforage.getItem('levelConfigs')),
                <FriendsConfig>(<unknown>localforage.getItem('friendsConfig')),
            ],
        );

        if (version && version === LocalForage._version) {
            localforagePlayerConfig && updatePlayerConfig(localforagePlayerConfig);
            localforageLevelConfigs && updateLevelConfigs(localforageLevelConfigs);
            localforageFriendsConfig && updateFriendsConfig(localforageFriendsConfig);
        }

        this._loading = false;
    }

    public async save(): Promise<void> {
        await Promise.all([
            localforage.setItem('version', LocalForage._version),
            localforage.setItem('playerConfig', playerConfig),
            localforage.setItem('levelConfigs', levelConfigs),
            localforage.setItem('friendsConfig', friendsConfig),
        ]);
    }

    public async reset(): Promise<void> {
        await Promise.all([
            localforage.setItem('playerConfig', null),
            localforage.setItem('levelConfigs', null),
            localforage.setItem('friendsConfig', null),
        ]);
    }
}
