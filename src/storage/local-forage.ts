import localforage from 'localforage';
import { levelConfigs, updateLevelConfigs } from '../constants/configs/level-configs';
import { playerConfig, updatePlayerConfig } from '../constants/configs/player-configs';

export class LocalForage {
    private _loading: boolean;

    public constructor() {
        localforage.config({
            name: 'clicker',
            version: 1.0,
            storeName: 'game', // Should be alphanumeric, with underscores.
        });
    }

    public get loading(): boolean {
        return this._loading;
    }

    public async load(): Promise<void> {
        this._loading = true;
        const [localforagePlayerConfig, localforageLevelConfigs] = await Promise.all([
            <PlayerConfig>(<unknown>localforage.getItem('playerConfig')),
            <LevelConfig[]>(<unknown>localforage.getItem('levelConfigs')),
        ]);
        localforagePlayerConfig && updatePlayerConfig(localforagePlayerConfig);
        localforageLevelConfigs && updateLevelConfigs(localforageLevelConfigs);
        this._loading = false;
    }

    public async save(): Promise<void> {
        await Promise.all([
            localforage.setItem('playerConfig', playerConfig),
            localforage.setItem('levelConfigs', levelConfigs),
        ]);
    }

    public async reset(): Promise<void> {
        await Promise.all([localforage.setItem('playerConfig', null), localforage.setItem('levelConfigs', null)]);
    }
}
