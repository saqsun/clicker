import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { Scrollbox } from 'pixi-scrollbox';
import { Container } from '../utils/container';

export class MenuView extends Container {
    public constructor(private _w: number, private _h: number) {
        super();
        this.name = 'MenuView';
        this._build();
    }

    private _build(): void {
        const scrollbox = new Scrollbox({ boxWidth: this._w, boxHeight: this._h, scrollbarSize: 0 });
        for (let i = 0; i < 10; i += 1) {
            const sprite = scrollbox.content.addChild(new Sprite(Texture.WHITE));
            sprite.width = this._w;
            sprite.height = this._h / 3.5;
            sprite.y = sprite.height * i;
            sprite.tint = i % 2 === 0 ? 0xff0000 : 0x0000ff;
            this.addChild(scrollbox);
        }

        scrollbox.update();
        // const graphics = new Graphics();
        // graphics.beginFill(0xaabbee);
        // graphics.drawRect(-200, -200, 400, 400);
        // graphics.endFill();
        // this.addChild(graphics);
    }
}
