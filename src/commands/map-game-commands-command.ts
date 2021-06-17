import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { BossModelEvent, BotModelEvent, FriendModelEvent, GameModelEvent, PlayerModelEvent } from '../events/model';
import { BossViewEvent, BotViewEvent, MenuItemViewEvent } from '../events/view';
import { onBossClickCommand } from './on-boss-click-command';
import { onBossDefeatUpdateCommand } from './on-boss-defeat-update-command';
import { onBossReviveTimerCompleteUpdateCommand } from './on-boss-revive-timer-update-command';
import { onBotClickCommand } from './on-bot-click-command';
import { onBotDefeatUpdateCommand } from './on-bot-defeat-update-command';
import { onConfigsUpdateCommand } from './on-configs-update-command';
import { onFriendStateUpdateCommand } from './on-friend-state-update-command';
import { onGameLevelUpdateCommand } from './on-game-level-update-command';
import { onMenuItemActiveButtonClickCommand } from './on-menu-item-active-button-click-command';
import { onMenuItemUpgradeButtonClickCommand } from './on-menu-item-upgrade-button-click-command';
import { onPlayerMoneyUpdateCommand } from './on-player-money-update-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameEvent.configsUpdate, onConfigsUpdateCommand)
        .on(GameModelEvent.levelUpdate, onGameLevelUpdateCommand)
        .on(PlayerModelEvent.moneyUpdate, onPlayerMoneyUpdateCommand)
        .on(MenuItemViewEvent.activeButtonClick, onMenuItemActiveButtonClickCommand)
        .on(MenuItemViewEvent.upgradeButtonClick, onMenuItemUpgradeButtonClickCommand)
        .on(BotViewEvent.click, onBotClickCommand)
        .on(BossViewEvent.click, onBossClickCommand)
        .on(BotModelEvent.defeatUpdate, onBotDefeatUpdateCommand)
        .on(BossModelEvent.reviveTimerCompleteUpdate, onBossReviveTimerCompleteUpdateCommand)
        .on(BossModelEvent.defeatUpdate, onBossDefeatUpdateCommand)
        .on(FriendModelEvent.stateUpdate, onFriendStateUpdateCommand);
};
