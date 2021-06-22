import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { InteractionEvent } from '@pixi/interaction';
import { Rectangle } from '@pixi/math';
import { BossModelEvent } from '../events/model';
import { BossViewEvent } from '../events/view';
import { BotView } from './bot-view';

export class BossView extends BotView {
    public constructor(uuid: string, hitArea: Rectangle) {
        super(uuid, hitArea);
        lego.event.on(BossModelEvent.hpUpdate, this.$onHpUpdate, this);
    }

    protected $build(): void {
        const graphics = new Graphics();
        graphics.beginFill(Math.floor(Math.random() * 16777215));
        graphics.drawCircle(0, 0, 200);
        graphics.endFill();
        this.addChild(graphics);
    }

    protected $onPointerDown(e: InteractionEvent): void {
        e.data.isPrimary && lego.event.emit(BossViewEvent.click);
    }
}
