import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getForegroundGridConfig } from '../constants/configs/grid-configs';

export class ForegroundView extends PixiGrid {
    public constructor() {
        super();
        this.name = 'ForegroundView';
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    private _build(): void {
        //
    }
}
