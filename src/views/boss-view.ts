import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { BossViewEvent } from '../events/view';
import { BotView } from './bot-view';

export class BossView extends BotView {
    public constructor() {
        super();
        this.name = 'BossView';
    }

    protected $build(): void {
        const graphics = new Graphics();
        graphics.beginFill(Math.floor(Math.random() * 16777215));
        graphics.drawCircle(0, 0, 300);
        graphics.endFill();
        this.addChild(graphics);
    }

    protected $onPointerDown(): void {
        lego.event.emit(BossViewEvent.click);
    }
}
