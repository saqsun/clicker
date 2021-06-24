import { lego } from '@armathai/lego';
import EventEmitter from 'events';
import { FriendModelEvent, FriendsModelEvent } from '../events/model';
import { FriendModel, FriendState } from '../models/friend-model';
import { Container } from '../utils/container';
import { FriendView } from './friend-view';

export class FriendsView extends Container {
    public onSizeUpdate: EventEmitter = new EventEmitter();
    private _friends: FriendView[] = [];

    public constructor() {
        super();
        this.name = 'FriendsView';

        lego.event.on(FriendsModelEvent.friendsUpdate, this._onFriendsUpdate, this);
        lego.event.on(FriendModelEvent.isActiveUpdate, this._onIsActiveUpdate, this);
        lego.event.on(FriendModelEvent.stateUpdate, this._onFriendStateUpdate, this);
    }
    public getFriendByUuid(uuid: string): FriendView {
        return this._friends.find((friend) => friend.uuid === uuid);
    }

    private _onFriendsUpdate(friendModels: FriendModel[]): void {
        friendModels.forEach((friendModel) => {
            const friendView = new FriendView(friendModel);
            friendView.x += friendModel.index * 80;
            this.addChild(friendView);
            this._friends.push(friendView);
        });
        //
    }

    private _onIsActiveUpdate(value: boolean, preValue: boolean, friendUuid: string): void {
        const friendView = this.getFriendByUuid(friendUuid);
        friendView.visible = value;
        this.onSizeUpdate.emit('sizeUpdate');
    }

    private _onFriendStateUpdate(value: FriendState, preValue: FriendState, friendUuid: string): void {
        const friendView = this.getFriendByUuid(friendUuid);
        switch (value) {
            case FriendState.action:
                friendView.action();
                break;

            default:
                break;
        }
    }
}
