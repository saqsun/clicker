import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { BossModelEvent, BotModelEvent } from '../events/model';
import { BossViewEvent, BotViewEvent } from '../events/view';
import { onBossClickCommand } from './on-boss-click-command';
import { onBossDefeatUpdateCommand } from './on-boss-defeat-update-command';
import { onBossReviveTimerCompleteUpdateCommand } from './on-boss-revive-timer-update-command';
import { onBotClickCommand } from './on-bot-click-command';
import { onBotDefeatUpdateCommand } from './on-bot-defeat-update-command';
import { onConfigsUpdateCommand } from './on-configs-update-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameEvent.configsUpdate, onConfigsUpdateCommand)
        .on(BotViewEvent.click, onBotClickCommand)
        .on(BossViewEvent.click, onBossClickCommand)
        .on(BotModelEvent.defeatUpdate, onBotDefeatUpdateCommand)
        .on(BossModelEvent.reviveTimerCompleteUpdate, onBossReviveTimerCompleteUpdateCommand)
        .on(BossModelEvent.defeatUpdate, onBossDefeatUpdateCommand);
};
