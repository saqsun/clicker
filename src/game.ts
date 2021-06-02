import { lego } from '@armathai/lego';
import { Application } from '@pixi/app';
import { ILoaderResource } from '@pixi/loaders';
import { Rectangle } from '@pixi/math';
import { Ticker } from '@pixi/ticker';
import { gsap } from 'gsap';
import manifest from '../manifest.json';
import { AssetsLoader } from './assets/loader';
import { GameEvent } from './events/game';
import { LocalForage } from './storage/local-forage';
import { lp, postRunnable } from './utils';

export class Game extends Application {
    private _assetsLoader: AssetsLoader;
    private _localForage: LocalForage;
    private _baseBounds: Rectangle;
    private _viewBounds: Rectangle;
    private _viewScale: number;
    private _revealed = false;
    private _interaction = false;
    private _manifest = manifest;

    public constructor() {
        super({
            resolution: window.devicePixelRatio || 1,
            sharedTicker: true,
        });
        Ticker.shared.maxFPS = 60;
        this._addErrorEventCallback();
        this._addReadyEventCallback();
    }

    public get baseBounds(): Rectangle {
        return this._baseBounds;
    }

    public get viewBounds(): Rectangle {
        return this._viewBounds;
    }

    public get viewScale(): number {
        return this._viewScale;
    }

    public get interaction(): boolean {
        return this._interaction;
    }

    public get size(): typeof manifest.size {
        return this._manifest.size;
    }

    public get screenSize(): { width: number; height: number } {
        return {
            height: document.body.clientHeight,
            width: document.body.clientWidth,
        };
    }

    public saveConfigs(): void {
        this._localForage.save();
    }

    public resetConfigs(): void {
        this._localForage.reset();
    }

    public updateConfigs(): void {
        lego.event.emit(GameEvent.configsUpdate);
    }

    private _onResize(): void {
        this._resizeCanvas();
        this._resizeRenderer();
        this._calculateTransform();

        lego.event.emit(GameEvent.resize, this.screenSize);
    }

    private _onFirstInteraction(): void {
        this._interaction = true;
        lego.event.emit(GameEvent.firstInteraction);
    }

    private _resume(): void {
        console.warn('resume');
        const ticker = Ticker.shared;
        !ticker.started && ticker.start();
        gsap.ticker.wake();
        lego.event.emit(GameEvent.resume);
    }

    private _pause(): void {
        console.warn('pause');
        const ticker = Ticker.shared;
        ticker.started && ticker.stop();
        gsap.ticker.sleep();
        lego.event.emit(GameEvent.pause);
    }

    private _addErrorEventCallback(): void {
        window.addEventListener('error', (ev: ErrorEvent): void => {
            let msg = ev.message + ', url=' + ev.target + ', line=' + ev.lineno;
            if (ev.colno) {
                msg += ', column=' + ev.colno;
            }
            if (ev.error) {
                msg += ', error=' + JSON.stringify(ev.error);
            }
            this._onError(msg);
        });
    }

    private _onError(...msg: string[]): void {
        void msg;
    }

    private _addReadyEventCallback(): void {
        window.addEventListener('DOMContentLoaded', () => this._onDOMContentLoaded());
    }

    private _onDOMContentLoaded(): void {
        this._init();
        this._addVisibleChangeCallback();
        this._addResizeCallback();
        this._addFirstInteractionCallback();
    }

    private _addVisibleChangeCallback(): void {
        let hidden: string;
        let visibilityChange: string;
        if (typeof document.hidden !== 'undefined') {
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }

        const getVisibility = (): boolean => {
            return !!!document[hidden as keyof typeof document];
        };
        // Handle page visibility change
        document.addEventListener(visibilityChange, () => this._onVisibilityChange(getVisibility()), false);
        this._onVisibilityChange(getVisibility());
    }

    private _onVisibilityChange(isVisible: boolean): void {
        if (!this._revealed) {
            this._reveal(isVisible);
            return;
        }
        isVisible ? this._resume() : this._pause();
    }

    private _addResizeCallback(): void {
        window.addEventListener('resize', () => this._onResize());
    }

    private _addFirstInteractionCallback(): void {
        const firstInteract = (): void => {
            window.removeEventListener('touchstart', firstInteract);
            window.removeEventListener('mousedown', firstInteract);
            this._interaction = true;
            postRunnable(() => this._onFirstInteraction());
        };
        window.addEventListener('touchstart', firstInteract);
        window.addEventListener('mousedown', firstInteract);
    }

    private _reveal(isVisible: boolean): void {
        if (!isVisible) {
            return;
        }
        this._revealed = true;

        this._onResize();

        if (this._assetsLoader && !this._assetsLoader.loading && this._localForage && !this._localForage.loading) {
            this._start();
        }
    }

    private _init(): void {
        const canvas = document.getElementById('canvas');
        const { view } = this;
        view.classList.add('game');
        canvas.appendChild(view);
        lego.event.emit(GameEvent.init);
        this._preload();
    }

    private async _preload(): Promise<void> {
        lego.event.emit(GameEvent.preload);
        try {
            this._assetsLoader = new AssetsLoader();
            this._localForage = new LocalForage();

            const assetsLoaderPromise = this._assetsLoader.load((progress: number) =>
                this._onAssetsLoadProgress(progress),
            );
            const localForagePromise = this._localForage.load();

            const [resources] = await Promise.all([assetsLoaderPromise, localForagePromise]);

            this._onAssetsLoaded(resources);
        } catch (e) {
            throw e;
        }
    }

    private _start(): void {
        lego.event.emit(GameEvent.start);
        this.view.classList.add('fadeIn');
    }

    private _onAssetsLoadProgress(progress: number): void {
        lego.event.emit(GameEvent.loadProgress, progress);
    }

    private _onAssetsLoaded(resources: { [name: string]: ILoaderResource }): void {
        lego.event.emit(GameEvent.load, resources);
        if (this._revealed) {
            this._start();
        }
    }

    private _resizeCanvas(): void {
        const { style } = this.renderer.view;
        const { width, height } = this.screenSize;
        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private _resizeRenderer(): void {
        const { width, height } = this.screenSize;
        this.renderer.resize(width, height);
    }

    private _calculateTransform(): void {
        this._baseBounds = this._getBaseBounds();
        this._viewScale = this._getViewScale();
        this._viewBounds = this._getViewBounds();
    }

    private _getBaseBounds(): Rectangle {
        const { size } = this._manifest;
        const { width, height } = lp(size.landscape, size.portrait);

        return new Rectangle(0, 0, width, height);
    }

    private _getViewScale(): number {
        const { baseBounds } = this;
        const { width: baseWidth, height: baseHeight } = baseBounds;

        const { renderer } = this;
        const { width: rendererWidth, height: rendererHeight } = renderer.screen;

        return Math.min(rendererWidth / baseWidth, rendererHeight / baseHeight);
    }

    private _getViewBounds(): Rectangle {
        const { viewScale, renderer } = this;
        const { x, y, width, height } = renderer.screen;

        return new Rectangle(x, y, width / viewScale, height / viewScale);
    }
}

window.Game = Game;
