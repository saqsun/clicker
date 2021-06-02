/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getMainGridConfig } from '../constants/configs/grid-configs';
import { GameEvent } from '../events/game';
import { BackgroundView } from './background-view';
import { ForegroundView } from './foreground-view';
import { GameView } from './game-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    public constructor() {
        super();
        this._build();
        this.name = 'MainView';

        lego.event.on(GameEvent.resize, this.onResize, this);
    }

    public onResize(): void {
        this.rebuild(this.getGridConfig());
        this._updateScale();
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private _build(): void {
        this._updateScale();

        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.setChild('main', new BackgroundView());
        this.setChild('main', new GameView());
        this.setChild('main', new UIView());
        this.setChild('main', new ForegroundView());
    }

    private _updateScale(): void {
        this.scale.set(game.viewScale);
    }
}
