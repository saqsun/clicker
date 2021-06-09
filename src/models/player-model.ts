import { ObservableModel } from './observable-model';

export class PlayerModel extends ObservableModel {
    private _damage: number;
    private _money: number;

    public constructor(private _playerConfig: PlayerConfig) {
        super('PlayerModel');
        this.makeObservable('_damage', '_money');
    }

    public get damage(): number {
        return this._damage;
    }

    public set damage(value: number) {
        this._damage = value;
    }

    public get money(): number {
        return this._money;
    }

    public set money(value: number) {
        this._money = value;
    }

    public initialize(): void {
        this._damage = this._playerConfig.damage;
        this._money = this._playerConfig.money;
    }

    public credit(money: number): void {
        this._money += money;
    }
}
