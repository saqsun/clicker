import { FriendsModel } from './friends-model';
import { LevelModel } from './level-model';
import { ObservableModel } from './observable-model';

export class GameModel extends ObservableModel {
    private _level: LevelModel = null;
    private _friends: FriendsModel = null;
    private _levelIndex = -1;

    public constructor(private _levelConfigs: LevelConfig[], private _friendsConfigs: FriendConfigs) {
        super('GameModel');
        this.makeObservable('_level', '_friends');
    }

    public get level(): LevelModel {
        return this._level;
    }

    public get friends(): FriendsModel {
        return this._friends;
    }

    public get levelIndex(): number {
        return this._levelIndex;
    }

    public initialize(): void {
        this.initializeFriends();
        this.nextLevel();
    }

    public reviveLevel(): void {
        this._level && this._level.destroy();
        this._level = null;
        const levelsConfig = this._levelConfigs[this._levelIndex];
        this._level = new LevelModel(levelsConfig);
        this._level.initialize();
    }

    public initializeFriends(): void {
        this._friends = new FriendsModel(this._friendsConfigs);
        this._friends.initialize();
    }

    public hasNextLevel(): boolean {
        return this._levelIndex < this._levelConfigs.length - 1;
    }

    public nextLevel(): void {
        this._level && this._level.destroy();
        this._level = null;
        this._levelIndex += 1;
        const levelsConfig = this._levelConfigs[this._levelIndex];
        this._level = new LevelModel(levelsConfig);
        this._level.initialize();
    }
}
