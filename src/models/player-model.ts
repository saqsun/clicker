import { ObservableModel } from './observable-model';

export class PlayerModel extends ObservableModel {
    private _damage: number;

    public constructor(private _playerConfig: PlayerConfig) {
        super('PlayerModel');
        this.makeObservable('_damage');
    }

    public get damage(): number {
        return this._damage;
    }

    public set damage(value: number) {
        this._damage = value;
    }

    public initialize(): void {
        this._damage = this._playerConfig.damage;
    }
}
