import { Graphics } from '@pixi/graphics';
import { FriendModel } from '../models/friend-model';

export class FriendView extends Graphics {
    private _uuid: string;
    public constructor(friendModel: FriendModel) {
        super();
        this.name = 'FriendView';

        this.visible = friendModel.isActive;
        this._uuid = friendModel.uuid;

        this.beginFill(Math.floor(Math.random() * 16777215), 1);
        this.drawCircle(0, 0, 50);
        this.endFill();
    }

    public get uuid(): string {
        return this._uuid;
    }

    public setIsActiveUpdate(isActive: boolean): void {
        this.visible = isActive;
    }
}
