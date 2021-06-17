import { lego } from '@armathai/lego';
import { bossReviveTimerCompleteGuard } from '../guards/boss-revive-timer-complete-guard';
import { store } from '../models/store';
import { reviveLevelCommand } from './revive-level-command';

export const onBossReviveTimerCompleteUpdateCommand = (): void => {
    const { game } = store;
    const { level } = game;
    const { boss } = level;
    lego.command.payload(boss).guard(bossReviveTimerCompleteGuard).execute(reviveLevelCommand);
};
