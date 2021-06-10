import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Point } from '@pixi/math';
import { Text } from '@pixi/text';
import gsap from 'gsap/all';
import { getUIGridConfig } from '../constants/configs/grid-configs';
import {
    getDamageTextConfig,
    getDecrementHpTextConfig,
    getHPTextConfig,
    getIncrementMoneyTextConfig,
    getLevelTextConfig,
    getMoneyTextConfig,
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
import { getDisplayObjectByProperty, makeText } from '../utils';
import { randomInt } from '../utils/number/random-int';

export class UIView extends PixiGrid {
    private _hp: Text;
    private _level: Text;
    private _wave: Text;
    private _damage: Text;
    private _money: Text;

    public constructor() {
        super();
        this.name = 'UIView';
        lego.event
            .on(StoreEvent.gameUpdate, this._onGameUpdate, this)
            .on(StoreEvent.playerUpdate, this._onPlayerUpdate, this)
            .on(GameModelEvent.levelUpdate, this._onLevelUpdate, this)
            .on(PlayerModelEvent.damageUpdate, this._onDamageUpdate, this)
            .on(PlayerModelEvent.moneyUpdate, this._onMoneyUpdate, this)
            .on(LevelModelEvent.botUpdate, this._onBotUpdate, this)
            .on(LevelModelEvent.bossUpdate, this._onBossUpdate, this)
            .on(BotModelEvent.hpUpdate, this._onHpUpdate, this)
            .on(BossModelEvent.timeUpdate, this._onTimeUpdate, this)
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

        this._money = makeText(getMoneyTextConfig());
        this.setChild('money', this._money);
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

    private _onHpUpdate(hp: number, oldHP: number, uuid: string): void {
        this._hp.text = localization.t(phrases.HP, { hp });
        if (oldHP > hp) {
            const actor = getDisplayObjectByProperty('name', uuid);
            const dHPText = makeText(getDecrementHpTextConfig(oldHP - hp));
            const pos = dHPText.toLocal(new Point(0, 0), actor);
            dHPText.position.copyFrom(pos);
            window.game.stage.addChild(dHPText);
            gsap.to(dHPText, {
                duration: 1,
                y: `-=${randomInt(190, 210)}`,
                x: `+=${randomInt(-20, 20)}`,
                alpha: 0,
                onComplete: () => {
                    gsap.killTweensOf(dHPText);
                    dHPText.destroy();
                },
            });
        }
    }

    private _onTimeUpdate(time: number): void {
        this._wave.text = localization.t(phrases.boss, { time });
    }

    private _onDamageUpdate(damage: number): void {
        this._damage.text = localization.t(phrases.damage, { damage });
    }

    private _onMoneyUpdate(money: number, oldMoney: number): void {
        this._money.text = localization.t(phrases.money, { money });
        if (oldMoney < money) {
            const dMoneyText = makeText(getIncrementMoneyTextConfig(money - oldMoney));
            const pos = dMoneyText.toLocal(new Point(0, 0), this._money);
            dMoneyText.position.copyFrom(pos);
            window.game.stage.addChild(dMoneyText);
            gsap.to(dMoneyText, {
                duration: 1,
                y: `-=${randomInt(20, 30)}`,
                x: `+=${randomInt(-20, 20)}`,
                alpha: 0,
                onComplete: () => {
                    gsap.killTweensOf(dMoneyText);
                    dMoneyText.destroy();
                },
            });
        }
    }
}
