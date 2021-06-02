import { BotModel } from './bot-model';

export class BossModel extends BotModel {
    public constructor() {
        super('BossModel');
    }

    public get hp(): number {
        return this.$hp;
    }

    public get defeat(): boolean {
        return this.$defeat;
    }
}
