import { DisplayObject } from '@pixi/display';
import { NineSlicePlane } from '@pixi/mesh-extras';
import { Container } from '../utils/container';

export class BoardComponent extends Container {
    private _bg: NineSlicePlane;
    private _icon: DisplayObject;

    public constructor() {
        super();

        this._bg = null;
        this._icon = null;
        this.name = 'BoardComponent';

        this._build();
    }

    public get icon(): DisplayObject {
        return this._icon;
    }

    private _build(): void {
        void 0;
    }
}
