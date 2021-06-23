import { ObservableModel } from './observable-model';

export class PlayerModel extends ObservableModel {
    private _damage: number;
    private _money: number;
    private _updateCost: number;

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

    public get updateCost(): number {
        return this._updateCost;
    }

    public set updateCost(value: number) {
        this._updateCost = value;
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
        this._updateCost = this._playerConfig.updateCost;
    }

    public credit(money: number): void {
        this._money += money;
    }
}
