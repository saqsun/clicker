import { TextStyle } from '@pixi/text';
import { localization } from '../../localization';
import { phrases } from '../../localization/phrases';

export const getHPTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.HP, { hp: 0 }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#d68800',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#ffffff',
        }),
    };
};

export const getLevelTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.level, { level: 0 }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#000000',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#ffffff',
        }),
    };
};

export const getWaveTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.level, { level: 0 }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#000000',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#ffffff',
        }),
    };
};

export const getDamageTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.level, { level: 0 }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#000000',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#ffffff',
        }),
    };
};

export const getMoneyTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.level, { level: 0 }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#000000',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#ffffff',
        }),
    };
};

export const getDecrementHpTextConfig = (hp: number): TextConfig => {
    return {
        text: localization.t(phrases.decrement_hp, { hp }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 2,
        }),
    };
};

export const getIncrementMoneyTextConfig = (money: number): TextConfig => {
    return {
        text: localization.t(phrases.increment_money, { money }),
        style: new TextStyle({
            fontSize: 32,
            fill: '#00ff00',
            stroke: '#000000',
            strokeThickness: 2,
        }),
    };
};
