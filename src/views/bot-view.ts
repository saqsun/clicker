import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { InteractionEvent } from '@pixi/interaction';
import { Point, Rectangle } from '@pixi/math';
import gsap from 'gsap/all';
import { getDecrementHpTextConfig } from '../constants/configs/text-configs';
import { BotModelEvent } from '../events/model';
import { BotViewEvent } from '../events/view';
import { makeText } from '../utils';
import { Container } from '../utils/container';
import { randomInt } from '../utils/number/random-int';

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

    protected $onHpUpdate(newHP: number, oldHP: number): void {
        gsap.killTweensOf(this.scale);
        this.scale.set(1);
        if (oldHP > newHP) {
            gsap.to(this.scale, {
                duration: 0.1,
                x: 1.03,
                y: 1.03,
                yoyo: true,
                repeat: 1,
                ease: 'bounce.out',
            });
            const dHPText = makeText(getDecrementHpTextConfig(oldHP - newHP));
            const pos = dHPText.toLocal(new Point(0, 0), this);
            dHPText.position.copyFrom(pos);
            window.game.stage.addChild(dHPText);
            gsap.to(dHPText, {
                duration: 2,
                y: `-=${randomInt(190, 210)}`,
                x: `+=${randomInt(-20, 20)}`,
                alpha: 0,
                onComplete: () => {
                    gsap.killTweensOf(dHPText);
                    dHPText.destroy();
                },
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
        e.data.isPrimary && lego.event.emit(BotViewEvent.click);
    }
}
