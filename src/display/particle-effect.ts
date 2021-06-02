import { ParticleEffect } from '@armathai/pixi-particles';
import { Texture } from '@pixi/core';
import { Point } from '@pixi/math';
import { Ticker } from '@pixi/ticker';

export class ParticleEffectDisplayObject extends ParticleEffect {
    public constructor(config: ParticleConfig) {
        const { data, x = 0, y = 0, scale = new Point(1, 1) } = config;
        super(data, Texture.from);

        this.position.set(x, y);
        this.scale.copyFrom(scale);
    }

    public start(): void {
        super.start();
        Ticker.shared.add(this.update, this);
    }

    public update(): void {
        super.update(Ticker.shared.deltaMS);
    }

    public destroy(): void {
        Ticker.shared.remove(this.update, this);
        super.destroy();
    }
}
