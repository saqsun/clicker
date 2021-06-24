import { FriendModel } from './friend-model';
import { ObservableModel } from './observable-model';

export class FriendsModel extends ObservableModel {
    private _friends: FriendModel[];
    private _upgradeableFriends: FriendModel[];
    private _activatableFriends: FriendModel[];
    private _passiveFriends: FriendModel[];

    public constructor(private _config: FriendsConfigs) {
        super('FriendsModel');
        this.makeObservable('_friends', '_upgradeableFriends', '_activatableFriends', '_passiveFriends');
    }

    public get friends(): FriendModel[] {
        return this._friends;
    }

    public get upgradeableFriends(): FriendModel[] {
        return this._upgradeableFriends;
    }

    public get activatableFriends(): FriendModel[] {
        return this._activatableFriends;
    }

    public get passiveFriends(): FriendModel[] {
        return this._passiveFriends;
    }

    public initialize(): void {
        const friends: FriendModel[] = [];
        this._config.forEach((config, index) => {
            const friend = new FriendModel(config, index);
            friends.push(friend);
        });

        this._friends = friends;
    }

    public updateUpgradeableFriends(mony: number): void {
        this._upgradeableFriends = this._friends.filter((friend) => friend.isActive && friend.cost <= mony);
    }

    public updateConfig(): void {
        this.friends.forEach((friend) => {
            friend.updateConfig();
        });
    }

    public updateActivatableFriends(level: number, money: number): void {
        this._activatableFriends = this._friends.filter((friend) => {
            return !friend.isActive && friend.cost <= money && friend.activationLevel <= level + 1;
        });
    }

    public updatePassiveFriendsFriends(level: number, money: number): void {
        this._passiveFriends = this._friends.filter((friend) => {
            return (!friend.isActive && friend.activationLevel > level + 1) || friend.cost > money;
        });
    }

    public getFriendByUuid(uuid: string): FriendModel {
        return this._friends.find((friend) => friend.uuid === uuid);
    }

    public getFriendByIndex(index: number): FriendModel {
        return this._friends.find((friend) => friend.index === index);
    }

    public getActiveFriends(): FriendModel[] {
        return this._friends.filter((friend) => friend.isActive);
    }

    public getPassiveFriends(): FriendModel[] {
        return this._friends.filter((friend) => !friend.isActive);
    }
}
