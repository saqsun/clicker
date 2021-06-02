/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Ticker } from '@pixi/ticker';
import { AnimationState, SkeletonData, Spine } from 'pixi-spine';

export class SpineDisplayObject extends Spine {
    public constructor(config: SkeletonData) {
        super(config);
    }

    public update(): void {
        super.update(Ticker.shared.deltaMS / 1000);
    }

    public destroy(): void {
        Ticker.shared.remove(this.update, this);
        super.destroy();
    }

    //@ts-ignore
    public get state(): AnimationState {
        //@ts-ignore
        return super.state;
    }

    //@ts-ignore
    public set state(s: AnimationState): void {
        super.state = s;
    }
}
