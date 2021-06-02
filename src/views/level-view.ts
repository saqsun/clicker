import { lego } from '@armathai/lego';
import { LevelModelEvent } from '../events/model';
import { BotModel } from '../models/bot-model';
import { Container } from '../utils/container';
import { BossView } from './boss-view';
import { BotView } from './bot-view';

export class LevelView extends Container {
    private _botView: BotView;

    public constructor() {
        super();
        this.name = 'LevelView';
        lego.event
            .on(LevelModelEvent.botUpdate, this._onBotUpdate, this)
            .on(LevelModelEvent.bossUpdate, this._onBossUpdate, this);
    }

    private _onBotUpdate(bot: BotModel): void {
        bot ? this._createBotView() : this._destroyBotView();
    }

    private _createBotView(): void {
        this._botView = new BotView();
        this.addChild(this._botView);
    }

    private _destroyBotView(): void {
        this._botView.destroy();
    }

    private _onBossUpdate(bot: BotModel): void {
        bot ? this._createBossView() : this._destroyBossView();
    }

    private _createBossView(): void {
        this._botView = new BossView();
        this.addChild(this._botView);
    }

    private _destroyBossView(): void {
        this._botView.destroy();
    }
}
