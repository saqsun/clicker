import { friendConfigs } from '../constants/configs/friend-configs';
import { levelConfigs } from '../constants/configs/level-configs';
import { playerConfig } from '../constants/configs/player-configs';
import { postRunnable } from '../utils/index';
import { GameModel } from './game-model';
import { ObservableModel } from './observable-model';
import { PlayerModel } from './player-model';

class Store extends ObservableModel {
    private _player: PlayerModel = null;
    private _game: GameModel = null;

    public constructor() {
        super('Store');
        this.makeObservable();
    }

    public get player(): PlayerModel {
        return this._player;
    }

    public set player(value) {
        this._player = value;
    }

    public get game(): GameModel {
        return this._game;
    }

    public set game(value) {
        this._game = value;
    }

    // PLAYER
    public initializePlayerModel(): void {
        this._player = new PlayerModel(playerConfig);
        this._player.initialize();
    }

    public destroyPlayerModel(): void {
        this._player.destroy();
        this._player = null;
    }

    // GAME
    public initializeGameModel(): void {
        this._game = new GameModel(levelConfigs, friendConfigs);
        postRunnable(() => {
            this._game.initialize();
        });
    }

    public destroyPlayModel(): void {
        this._game.destroy();
        this._game = null;
    }
}

export const store = new Store();
