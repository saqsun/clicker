import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Rectangle } from '@pixi/math';
import { getLevelGridConfig } from '../constants/configs/grid-configs';
import { GameEvent } from '../events/game';
import { LevelModelEvent } from '../events/model';
import { BotModel } from '../models/bot-model';
import { postRunnable } from '../utils';
import { BossView } from './boss-view';
import { BotView } from './bot-view';

export class LevelView extends PixiGrid {
    private _botView: BotView;

    public constructor() {
        super();
        this.name = 'LevelView';
        lego.event
            .on(GameEvent.resize, this._onResize, this)
            .on(LevelModelEvent.botUpdate, this._onBotUpdate, this)
            .on(LevelModelEvent.bossUpdate, this._onBossUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getLevelGridConfig();
    }

    private _onResize(): void {
        postRunnable(() => {
            const { area } = this.getCellByName('actor');
            if (this._botView) {
                this._botView.updateHitArea(new Rectangle(0, 0, area.width, area.height));
            }
        });
    }

    private _onBotUpdate(bot: BotModel): void {
        bot ? this._createBotView(bot) : this._destroyBotView();
    }

    private _createBotView(bot: BotModel): void {
        const { area } = this.getCellByName('actor');
        this._botView = new BotView(bot.uuid, new Rectangle(0, 0, area.width, area.height));
        this.setChild('actor', this._botView);
    }

    private _destroyBotView(): void {
        this.removeContent(this._botView);
        this._botView.destroy();
    }

    private _onBossUpdate(bot: BotModel): void {
        bot ? this._createBossView(bot) : this._destroyBossView();
    }

    private _createBossView(bot: BotModel): void {
        const { area } = this.getCellByName('actor');
        this._botView = new BossView(bot.uuid, new Rectangle(0, 0, area.width, area.height));
        this.setChild('actor', this._botView);
    }

    private _destroyBossView(): void {
        this._botView.destroy();
    }
}
