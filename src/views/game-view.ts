import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameGridConfig } from '../constants/configs/grid-configs';
import { GameModelEvent, LevelModelEvent } from '../events/model';
import { FriendsModel } from '../models/friends-model';
import { LevelModel } from '../models/level-model';
import { postRunnable } from '../utils';
import { FriendsView } from './friends-view';
import { LevelView } from './level-view';

export class GameView extends PixiGrid {
    private _levelView: LevelView;
    private _friendsView: FriendsView;

    public constructor() {
        super();
        this.name = 'GameView';
        lego.event
            .on(GameModelEvent.levelUpdate, this._onLevelUpdate, this)
            .on(GameModelEvent.friendsUpdate, this._onFriendsUpdate, this)
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

    private _onFriendsUpdate(friendsModel: FriendsModel): void {
        friendsModel ? this._createFriendsView() : this._destroyFriendsView();
    }

    private _createFriendsView(): void {
        this._friendsView = new FriendsView();
        this._friendsView.onSizeUpdate.on('sizeUpdate', () => {
            this.setChild('friends', this._friendsView);
        });
        this.setChild('friends', this._friendsView);
    }

    private _destroyFriendsView(): void {
        // lego.event.off(GameModelEvent.levelUpdate, this._onLevelUpdate, this);
        this._friendsView.destroy();
        this._friendsView = null;
    }

    private _onBotUpdate(): void {
        postRunnable(() => this.rebuild());
    }

    private _onBossUpdate(): void {
        postRunnable(() => this.rebuild());
    }
}
