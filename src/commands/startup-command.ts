import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { onGameStartCommand } from './on-game-start-command';

export const startupCommand = (): void => {
    lego.command.on(GameEvent.start, onGameStartCommand);
};
