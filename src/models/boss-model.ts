import { loopRunnable, removeRunnable } from '../utils';
import { BotModel } from './bot-model';

export class BossModel extends BotModel {
    private static _reviveTimer = 30;
    private _reviveDelayRunnable: Runnable;
    private _reviveTimerComplete = false;
    private _baseHp: number;
    private _time: number;

    public constructor() {
        super('BossModel');
        this.makeObservable('_reviveTimerComplete', '_time');
    }

    public get hp(): number {
        return this.$hp;
    }

    public get defeat(): boolean {
        return this.$defeat;
    }

    public get reviveTimerComplete(): boolean {
        return this._reviveTimerComplete;
    }

    public get time(): number {
        return this._time;
    }

    public initialize(hp: number, money: number): void {
        super.initialize(hp, money);
        this._baseHp = hp;
        this._startReviveTimer();
    }

    public destroy(): void {
        this._stopReviveTimer();
    }

    public revive(): void {
        this._stopReviveTimer();
        this._reviveTimerComplete = false;
        this.initialize(this._baseHp, this.$money);
    }

    public hit(damage: number): void {
        super.hit(damage);
        if (this.$defeat) {
            this._stopReviveTimer();
        }
    }

    private _startReviveTimer(): void {
        this._time = BossModel._reviveTimer;
        this._reviveDelayRunnable = loopRunnable(1, () => {
            this._time -= 1;
            if (this._time === 0) {
                this._reviveTimerComplete = true;
            }
        });
    }

    private _stopReviveTimer(): void {
        removeRunnable(this._reviveDelayRunnable);
    }
}
