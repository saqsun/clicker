import { Graphics } from '@pixi/graphics';
import { gsap } from 'gsap/all';
import { FriendModel } from '../models/friend-model';

export class FriendView extends Graphics {
    private _uuid: string;
    public constructor(friendModel: FriendModel) {
        super();
        this.name = 'FriendView';

        this.visible = friendModel.isActive;
        this._uuid = friendModel.uuid;

        this.beginFill(friendModel.iconColor, 1);
        this.drawCircle(0, 0, 50);
        this.endFill();
    }

    public get uuid(): string {
        return this._uuid;
    }

    public setIsActiveUpdate(isActive: boolean): void {
        this.visible = isActive;
    }

    public action(): void {
        gsap.to(this.scale, {
            duration: 0.1,
            x: 1.2,
            y: 1.2,
            yoyo: true,
            repeat: 1,
            ease: 'bounce.out',
        });
    }
}
