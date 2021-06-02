import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Text } from '@pixi/text';
import { getUIGridConfig } from '../constants/configs/grid-configs';
import {
    getDamageTextConfig,
    getHPTextConfig,
    getLevelTextConfig,
    getWaveTextConfig,
} from '../constants/configs/text-configs';
import {
    BossModelEvent,
    BotModelEvent,
    GameModelEvent,
    LevelModelEvent,
    PlayerModelEvent,
    StoreEvent,
} from '../events/model';
import { localization } from '../localization';
import { phrases } from '../localization/phrases';
import { BotModel } from '../models/bot-model';
import { store } from '../models/store';
import { makeText } from '../utils';

export class UIView extends PixiGrid {
    private _hp: Text;
    private _level: Text;
    private _wave: Text;
    private _damage: Text;

    public constructor() {
        super();
        this.name = 'UIView';
        lego.event
            .on(StoreEvent.gameUpdate, this._onGameUpdate, this)
            .on(StoreEvent.playerUpdate, this._onPlayerUpdate, this)
            .on(GameModelEvent.levelUpdate, this._onLevelUpdate, this)
            .on(PlayerModelEvent.damageUpdate, this._onDamageUpdate, this)
            .on(LevelModelEvent.botUpdate, this._onBotUpdate, this)
            .on(LevelModelEvent.bossUpdate, this._onBossUpdate, this)
            .on(BotModelEvent.hpUpdate, this._onHpUpdate, this)
            .on(BossModelEvent.hpUpdate, this._onHpUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    private _onGameUpdate(): void {
        this._level = makeText(getLevelTextConfig());
        this.setChild('level', this._level);

        this._wave = makeText(getWaveTextConfig());
        this.setChild('wave', this._wave);

        this._hp = makeText(getHPTextConfig());
        this.setChild('hp', this._hp);
    }

    private _onPlayerUpdate(): void {
        this._damage = makeText(getDamageTextConfig());
        this.setChild('damage', this._damage);
    }

    private _onLevelUpdate(): void {
        this._level.text = localization.t(phrases.level, { level: store.game.levelIndex + 1 });
    }

    private _onBotUpdate(bot: BotModel): void {
        if (!bot) {
            return;
        }
        this._wave.text = localization.t(phrases.bot, { bot: store.game.level.botIndex + 1 });
    }

    private _onBossUpdate(bot: BotModel): void {
        if (!bot) {
            return;
        }
        this._wave.text = localization.t(phrases.boss);
    }

    private _onHpUpdate(hp: number): void {
        this._hp.text = localization.t(phrases.HP, { hp });
    }

    private _onDamageUpdate(damage: number): void {
        this._damage.text = localization.t(phrases.damage, { damage });
    }
}
