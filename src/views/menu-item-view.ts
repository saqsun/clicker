import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { Point } from '@pixi/math';
import { Text } from '@pixi/text';
import { TextStyle } from 'pixi.js';
import { MenuItemViewEvent } from '../events/view';
import { makeText } from '../utils';
import { Container } from '../utils/container';

export class MenuItemView extends Container {
    private _w: number;
    private _h: number;
    private _bg: Graphics;
    private _dmg: Text;
    private _cost: Text;
    private _button: Graphics;

    public constructor(
        _w: number,
        _h: number,
        damage: number,
        cost: number,
        private _name: string,
        private _friendUuid: string,
        private _iconColor: number,
    ) {
        super();
        this.name = 'MenuView';
        this._w = _w;
        this._h = _h;
        this._build(damage, cost);
    }

    public get friendUuid(): string {
        return this._friendUuid;
    }

    public activatedActivateButton(): void {
        this._button.destroy();
        this._button = null;
        this._buildButton(0xee9e30);
        this._button.interactive = true;
        this._button.on('pointerup', () => {
            lego.event.emit(MenuItemViewEvent.activeButtonClick, this._friendUuid);
        });

        this.sortChildren();
    }

    public activatedUpgradeButton(): void {
        this._button.destroy();
        this._button = null;
        this._buildButton(0x00ff00);
        this._button.interactive = true;
        this._button.on('pointerup', () => {
            lego.event.emit(MenuItemViewEvent.upgradeButtonClick, this._friendUuid);
        });

        this.sortChildren();
    }

    public activatedPassiveButton(): void {
        this._button.destroy();
        this._button = null;
        this._buildButton(0x5f5647);

        this.sortChildren();
    }

    public updateDmg(damage: number): void {
        this._dmg.text = `DMG ${damage}`;
    }

    public updateCost(cost: number): void {
        this._cost.text = `${cost}`;
    }

    private _build(damage: number, cost: number): void {
        this._buildBg();
        this._buildButton(0x5f5647);
        this._buildIcon();
        this._buildName();
        this._buildDmg(damage);
        this._buildCost(cost);

        this.sortChildren();
    }

    private _buildBg(): void {
        const graphics = new Graphics();
        graphics.beginFill(0x453f31);
        graphics.drawRoundedRect(0, 0, this._w, this._h, 30);
        graphics.endFill();
        this.addChild((this._bg = graphics));
    }

    private _buildButton(color: number): void {
        const graphics = new Graphics();
        graphics.beginFill(color);
        graphics.drawRoundedRect(this._bg.width - 140, 10, 130, this._h - 20, 30);
        graphics.endFill();
        graphics.zIndex = 1;
        this.addChild((this._button = graphics));
    }

    private _buildIcon(): void {
        const graphics = new Graphics();
        graphics.beginFill(this._iconColor);
        graphics.drawRoundedRect(10, 10, this._h - 20, this._h - 20, 30);
        graphics.endFill();
        this.addChild(graphics);
    }

    private _buildName(): void {
        const graphics = makeText({
            text: this._name,
            x: 100,
            y: 50,
            anchor: new Point(0, 0.5),
            style: new TextStyle({
                fontSize: 32,
                fill: '#ffffff',
                dropShadow: true,
                dropShadowAngle: 90,
                dropShadowDistance: 2,
                dropShadowBlur: 5,
                dropShadowColor: '#ffffff',
            }),
        });
        this.addChild(graphics);
    }

    private _buildDmg(damage: number): void {
        const dmg = makeText({
            text: `DMG ${damage}`,
            x: 300,
            y: 50,
            anchor: new Point(0, 0.5),
            style: new TextStyle({
                fontSize: 32,
                fill: '#ffffff',
                dropShadow: true,
                dropShadowAngle: 90,
                dropShadowDistance: 2,
                dropShadowBlur: 5,
                dropShadowColor: '#ffffff',
            }),
        });
        this.addChild((this._dmg = dmg));
    }

    private _buildCost(value: number): void {
        const cost = makeText({
            text: `${value}`,
            x: this._bg.width - 80,
            y: 50,
            anchor: new Point(0, 0.5),
            style: new TextStyle({
                fontSize: 32,
                fill: '#ffffff',
                dropShadow: true,
                dropShadowAngle: 90,
                dropShadowDistance: 2,
                dropShadowBlur: 5,
                dropShadowColor: '#ffffff',
            }),
        });
        cost.zIndex = 3;
        this.addChild((this._cost = cost));
    }
}
