import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { InteractionEvent } from '@pixi/interaction';
import { Rectangle } from '@pixi/math';
import gsap from 'gsap/all';
import { BotModelEvent } from '../events/model';
import { BotViewEvent } from '../events/view';
import { Container } from '../utils/container';

export class BotView extends Container {
    private _preEventTimeStamp: number;

    public constructor(uuid: string, hitArea: Rectangle) {
        super();
        this.name = uuid;
        this.$build();
        this.$makeInteractive(hitArea);

        lego.event.on(BotModelEvent.hpUpdate, this.$onHpUpdate, this);
    }

    public updateHitArea(hitArea: Rectangle): void {
        this.hitArea = new Rectangle(-hitArea.width / 2, -hitArea.height / 2, hitArea.width, hitArea.height);
    }

    protected $onHpUpdate(newHP: number, oldHP: number): void {
        gsap.killTweensOf(this.scale);
        this.scale.set(1);
        if (oldHP > newHP) {
            gsap.to(this.scale, {
                duration: 0.1,
                x: 0.93,
                y: 0.93,
                yoyo: true,
                repeat: 1,
                ease: 'bounce.out',
            });
        }
    }

    protected $build(): void {
        const graphics = new Graphics();
        graphics.beginFill(Math.floor(Math.random() * 16777215));
        graphics.drawRect(-200, -200, 400, 400);
        graphics.endFill();
        this.addChild(graphics);
    }

    protected $makeInteractive(hitArea: Rectangle): void {
        this.interactive = true;
        this.updateHitArea(hitArea);
        this.on('pointerdown', this.$onPointerDown, this);
    }

    protected $onPointerDown(e: InteractionEvent): void {
        if (this._preEventTimeStamp && e.data.originalEvent.timeStamp - this._preEventTimeStamp <= 30) {
            return;
        }
        lego.event.emit(BotViewEvent.click);
        this._preEventTimeStamp = e.data.originalEvent.timeStamp;
    }
}
