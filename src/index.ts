import { lego } from '@armathai/lego';
import '../styles/index.scss';
import { startupCommand } from './commands/startup-command';
import { GameEvent } from './events/game';
import './game';

(() => {
    if (process.env.NODE_ENV !== 'production' && __LEGOLOGGER__) {
        const { legologger } = require('@armathai/lego-logger');
        legologger.start(lego, {});
    }
    lego.command.on(GameEvent.init, startupCommand);
})();
