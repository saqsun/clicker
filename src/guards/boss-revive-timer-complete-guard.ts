import { BossModel } from '../models/boss-model';

export const bossReviveTimerCompleteGuard = (boss: BossModel): boolean => {
    return boss.reviveTimerComplete;
};
