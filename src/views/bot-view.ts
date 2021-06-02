import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { BotModelEvent } from '../events/model';
import { BotViewEvent } from '../events/view';
import { Container } from '../utils/container';

export class BotView extends Container {
    public constructor() {
        super();
        this.name = 'BotView';
        this.$build();
        this.$makeInteractive();
        lego.event.on(BotModelEvent.hpUpdate, this.$onHpUpdate, this);
    }

    protected $onHpUpdate(hp: number): void {
        console.info(hp);
    }

    protected $build(): void {
        const graphics = new Graphics();
        graphics.beginFill(Math.floor(Math.random() * 16777215));
        graphics.drawRect(0, 0, 400, 400);
        graphics.endFill();
        this.addChild(graphics);
    }

    protected $makeInteractive(): void {
        this.interactive = true;
        this.on('pointerdown', this.$onPointerDown, this);
    }

    protected $onPointerDown(): void {
        lego.event.emit(BotViewEvent.click);
    }
}
