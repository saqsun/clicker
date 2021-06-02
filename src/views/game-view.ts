import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameGridConfig } from '../constants/configs/grid-configs';
import { GameModelEvent, LevelModelEvent } from '../events/model';
import { LevelModel } from '../models/level-model';
import { postRunnable } from '../utils';
import { LevelView } from './level-view';

export class GameView extends PixiGrid {
    private _levelView: LevelView;

    public constructor() {
        super();
        this.name = 'GameView';
        lego.event
            .on(GameModelEvent.levelUpdate, this._onLevelUpdate, this)
            .on(LevelModelEvent.botUpdate, this._onBotUpdate, this)
            .on(LevelModelEvent.bossUpdate, this._onBossUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getGameGridConfig();
    }

    private _onLevelUpdate(level: LevelModel): void {
        level ? this._createLevelView() : this._destroyLevelView();
    }

    private _createLevelView(): void {
        this._levelView = new LevelView();
        this.setChild('level', this._levelView);
    }

    private _destroyLevelView(): void {
        // lego.event.off(GameModelEvent.levelUpdate, this._onLevelUpdate, this);
        this._levelView.destroy();
    }

    private _onBotUpdate(): void {
        postRunnable(() => this.rebuild());
    }

    private _onBossUpdate(): void {
        postRunnable(() => this.rebuild());
    }
}
