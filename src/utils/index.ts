/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Texture } from '@pixi/core';
import { Container, DisplayObject } from '@pixi/display';
import { Point } from '@pixi/math';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { Sprite } from '@pixi/sprite';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { Text, TextMetrics, TextStyle } from '@pixi/text';
import { Ticker } from '@pixi/ticker';

const isString = (str: unknown): boolean => {
    return typeof str === 'string' || str instanceof String;
};

export const lp = <L, P>(l: L, p: P): L | P => {
    if (window.matchMedia('(orientation: portrait)').matches) {
        // you're in PORTRAIT mode
        return p;
    }
    if (window.matchMedia('(orientation: landscape)').matches) {
        // you're in LANDSCAPE mode
        return l;
    }
};

export const delayRunnable = (
    delay: number,
    runnable: (...args: unknown[]) => unknown,
    context?: unknown,
    ...args: unknown[]
): Runnable => {
    let delayMS = delay * 1000;
    const delayWrapper = (): void => {
        delayMS -= Ticker.shared.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            Ticker.shared.remove(delayWrapper);
        }
    };
    Ticker.shared.add(delayWrapper);
    return delayWrapper;
};

export const removeRunnable = (runnable: Runnable): void => {
    Ticker.shared.remove(runnable);
};

export const loopRunnable = (
    delay: number,
    runnable: (...args: unknown[]) => unknown,
    context?: unknown,
    ...args: unknown[]
): Runnable => {
    let delayMS = delay * 1000;
    const delayWrapper = (): void => {
        delayMS -= Ticker.shared.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            delayMS = delay * 1000;
        }
    };
    Ticker.shared.add(delayWrapper);
    return delayWrapper;
};

export const postRunnable = (
    runnable: (...args: unknown[]) => unknown,
    context?: unknown,
    ...args: unknown[]
): void => {
    delayRunnable(Ticker.shared.deltaMS / 1000, runnable, context, ...args);
};

export const fitText = (textObject: Text, width: number, height?: number): void => {
    // @ts-ignore
    if (!textObject.defaultFontSize) {
        // @ts-ignore
        textObject.defaultFontSize = textObject.style.fontSize;
    }

    // @ts-ignore
    textObject.style.fontSize = textObject.defaultFontSize;

    const textMetrics = TextMetrics.measureText(textObject.text, textObject.style as TextStyle);
    const { width: textWidth, height: textHeight } = textMetrics;
    const ratioW = width ? width / textWidth : 1;
    const ratioH = height ? height / textHeight : 1;
    const ratio = Math.min(Math.min(ratioW, ratioH), 1);
    (textObject.style.fontSize as number) *= ratio;
};

export const makeSprite = (config: SpriteConfig | string): Sprite => {
    const {
        texture,
        tint = 0,
        x = 0,
        y = 0,
        scale = new Point(1, 1),
        anchor = new Point(0.5, 0.5),
    } = isString(config) ? { texture: <string>config } : <SpriteConfig>config;

    const img = new Sprite(Texture.from(texture));

    img.scale.copyFrom(scale);
    img.anchor.copyFrom(anchor);
    img.position.set(x, y);

    if (tint) img.tint = tint;

    return img;
};

export const makeTexture = (config: TextureConfig): Texture => Texture.from(config);

export const makeNineSlice = (config: NineSliceConfig): NineSlicePlane => {
    const { texture, data, width, height, x = 0, y = 0, tint, scale = new Point(1, 1) } = config;

    const img = new NineSlicePlane(Texture.from(texture), ...data);
    img.width = width;
    img.height = height;

    img.scale.copyFrom(scale);
    img.position.set(x, y);

    if (tint) img.tint = tint;

    return img;
};

export function makeText(config: TextConfig): Text {
    const { text, style, x = 0, y = 0, anchor = new Point(0.5, 0.5) } = config;

    const label = new Text(text, style);
    label.anchor.copyFrom(anchor);
    label.position.set(x, y);

    return label;
}

export function makeParticleEffect(
    config: ParticleConfig,
): import('../display/particle-effect').ParticleEffectDisplayObject {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { ParticleEffectDisplayObject } = require('../display/particle-effect');
    return new ParticleEffectDisplayObject(config);
}

export function makeAnimation(config: AnimationConfig): AnimatedSprite {
    const {
        frames = [],
        speed = 1,
        loop = false,
        x = 0,
        y = 0,
        scale = new Point(1, 1),
        anchor = new Point(0, 0),
    } = config;

    const anim = AnimatedSprite.fromFrames(frames);
    anim.animationSpeed = speed;
    anim.loop = loop;

    anim.anchor.set(anchor.x, anchor.y);
    anim.scale.set(scale.x, scale.y);
    anim.position.set(x, y);

    return anim;
}

export function makeSpine(config: SpineConfig): import('../display/spine').SpineDisplayObject {
    const { skeleton, x = 0, y = 0, scale = new Point(1, 1), speed = 1 } = config;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { SpineDisplayObject } = require('../display/spine');
    const spine = new SpineDisplayObject(skeleton);
    spine.state.timeScale = speed;

    spine.scale.set(scale.x, scale.y);
    spine.position.set(x, y);

    return spine;
}

export const getDisplayObjectByProperty = (prop: string, value: string, parent?: Container): DisplayObject => {
    const application = game;

    const { children } = parent || application.stage;

    if (!children || children.length === 0) {
        return null;
    }

    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child[prop as keyof typeof child] === value) {
            return child;
        }

        if (Object.prototype.hasOwnProperty.call(child, 'children')) {
            const displayObject = getDisplayObjectByProperty(prop, value, <Container>child);
            if (displayObject) {
                return displayObject;
            }
        }
    }

    return null;
};
