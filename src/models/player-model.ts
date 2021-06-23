import { ObservableModel } from './observable-model';

export class PlayerModel extends ObservableModel {
    private _damage: number;
    private _money: number;
    private _updateCost: number;
    private _dmgPlus: number;
    private _isUpgradeable: boolean;

    public constructor(private _playerConfig: PlayerConfig) {
        super('PlayerModel');
        this.makeObservable('_damage', '_money', '_updateCost', '_isUpgradeable', '_dmgPlus');
    }

    public get dmgPlus(): number {
        return this._dmgPlus;
    }

    public set dmgPlus(value: number) {
        this._dmgPlus = value;
    }

    public get isUpgradeable(): boolean {
        return this._isUpgradeable;
    }

    public set isUpgradeable(value: boolean) {
        this._isUpgradeable = value;
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

    public updateIsUpgradeable(): void {
        this._isUpgradeable = this._money >= this._updateCost ? true : false;
    }

    public updateDmg(): void {
        this.damage += this._dmgPlus;
    }

    public initialize(): void {
        this._damage = this._playerConfig.damage;
        this._isUpgradeable = false;
        this._updateCost = this._playerConfig.updateCost;
        this._money = this._playerConfig.money;
        this._dmgPlus = this._playerConfig.dmgPlus;
    }

    public credit(money: number): void {
        this._money += money;
    }
}
