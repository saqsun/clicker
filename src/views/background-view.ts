import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { getBackgroundGridConfig } from '../constants/configs/grid-configs';

export class BackgroundView extends PixiGrid {
    private _bg: Sprite;

    public constructor() {
        super();
        this.name = 'BackgroundView';
        this._createBg();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    private _createBg(): void {
        const graphics = new Graphics();
        // Rectangle
        graphics.beginFill(0xe0e0e0);
        graphics.drawRect(0, 0, 1, 1);
        graphics.endFill();
        this.setChild('bg', graphics);
    }
}
