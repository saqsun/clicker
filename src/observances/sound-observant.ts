import { lego } from '@armathai/lego';
import { sound } from '@pixi/sound';
import { utils } from 'pixi.js';
import { GameEvent } from '../events/game';
import { postRunnable } from '../utils';

export class SoundObservant {
    public constructor() {
        lego.event.once(GameEvent.start, this._init, this);
    }

    private _init(): void {
        lego.event.on(GameEvent.pause, this._pause, this).on(GameEvent.resume, this._resume, this);
        postRunnable(() => {
            if (game.interaction) {
                this._playLoop();
            } else {
                lego.event.once(GameEvent.firstInteraction, this._playLoop, this);
            }
        });
    }

    private _playSFX(name: string): void {
        this._play(name);
    }

    private _playLoop(): void {
        this._play('theme');
    }

    private _onSoundMuteUpdate(mute: boolean): void {
        mute ? this._mute() : this._unmute();
    }

    private _unmute(): void {
        sound.unmuteAll();
    }

    private _mute(): void {
        sound.muteAll();
    }

    private _pause(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.pauseAll();
    }

    private _resume(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.resumeAll();
    }

    private _play(
        sprite: string,
    ): import('@pixi/sound').IMediaInstance | Promise<import('@pixi/sound').IMediaInstance> {
        return sound.play('spritemap', { sprite });
    }
}
