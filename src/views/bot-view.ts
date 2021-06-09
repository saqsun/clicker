import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { InteractionEvent } from '@pixi/interaction';
import { Rectangle } from '@pixi/math';
import { BotModelEvent } from '../events/model';
import { BotViewEvent } from '../events/view';
import { Container } from '../utils/container';

export class BotView extends Container {
    public constructor(hitArea: Rectangle) {
        super();
        this.name = 'BotView';
        this.$build();
        this.$makeInteractive(hitArea);
        lego.event.on(BotModelEvent.hpUpdate, this.$onHpUpdate, this);
    }

    public updateHitArea(hitArea: Rectangle): void {
        this.hitArea = new Rectangle(-hitArea.width / 2, -hitArea.height / 2, hitArea.width, hitArea.height);
    }

    protected $onHpUpdate(hp: number): void {
        void hp;
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
        e.data.isPrimary && lego.event.emit(BotViewEvent.click);
    }
}
