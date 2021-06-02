import { lego } from '@armathai/lego';
import { initializeGameModelCommand } from './initialize-play-model-command';
import { initializePlayerModelCommand } from './initialize-player-model-command';

export const initializeModelsCommand = (): void => {
    lego.command.execute(initializePlayerModelCommand).execute(initializeGameModelCommand);
};
