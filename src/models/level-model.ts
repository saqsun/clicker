import { randomInt } from '../utils/number/random-int';
import { BossModel } from './boss-model';
import { BotModel } from './bot-model';
import { ObservableModel } from './observable-model';

export class LevelModel extends ObservableModel {
    private _boss: BossModel = null;
    private _bot: BotModel = null;
    private _botIndex = -1;
    private _botConfigs: BotConfig;
    private _bossConfig: BossConfig;

    public constructor(private _levelConfig: LevelConfig) {
        super('LevelModel');
        this._botConfigs = this._levelConfig.bots;
        this._bossConfig = this._levelConfig.boss;
        this.makeObservable('_bot', '_boss');
    }

    public get boss(): BossModel {
        return this._boss;
    }

    public get bot(): BotModel {
        return this._bot;
    }

    public get botIndex(): number {
        return this._botIndex;
    }

    public initialize(): void {
        this.nextBot();
    }

    public destroy(): void {
        this.destroyBot();
        this.destroyBoss();
    }

    public hasNextBot(): boolean {
        return this._botIndex < this._botConfigs.count - 1;
    }

    public nextBot(): void {
        this.destroyBot();
        this._botIndex += 1;
        this._bot = new BotModel();
        this._bot.initialize(Math.ceil(this._calculateBotHp()));
    }

    public setBoss(): void {
        this.destroyBot();
        this._boss = new BossModel();
        this._boss.initialize(Math.ceil(this._calculateBossHp()));
    }

    public reviveBoss(): void {
        this._boss.revive();
    }

    public destroyBot(): void {
        this._bot && this._bot.destroy();
        this._bot = null;
    }

    public destroyBoss(): void {
        this._boss && this._boss.destroy();
        this._boss = null;
    }

    private _calculateBotHp(): number {
        const { incrementHp, startHp } = this._botConfigs;
        const { min, max } = incrementHp;
        const increment = randomInt(min, max);
        return startHp + (startHp * this._botIndex * increment) / 100;
    }

    private _calculateBossHp(): number {
        const startHp = this._calculateBotHp();
        const { incrementHp } = this._bossConfig;
        const { min, max } = incrementHp;
        const increment = randomInt(min, max);
        return startHp + (startHp * increment) / 100;
    }
}
