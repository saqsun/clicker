import { ObservableModel } from './observable-model';

export class BotModel extends ObservableModel {
    protected $hp: number;
    protected $money: number;
    protected $defeat = false;

    public constructor(name = 'BotModel') {
        super(name);
        this.makeObservable('$hp', '$defeat');
    }

    public get hp(): number {
        return this.$hp;
    }

    public get money(): number {
        return this.$money;
    }

    public get defeat(): boolean {
        return this.$defeat;
    }

    public initialize(hp: number, money: number): void {
        this.$hp = hp;
        this.$money = money;
        this.$defeat = this.$hp <= 0;
    }

    public hit(damage: number): void {
        this.$hp = Math.max(0, this.$hp - damage);
        this.$defeat = this.$hp <= 0;
    }
}
