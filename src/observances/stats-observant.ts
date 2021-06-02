import { PixiStatsPlugin } from '@armathai/pixi-stats';

export class StatsObservant {
    private _pixiStatsPlugin: PixiStatsPlugin;
    private _visible = false;

    public constructor() {
        this._pixiStatsPlugin = new PixiStatsPlugin(game);
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 's') {
                this._toggleStats();
            }
        });
        if (sessionStorage['__stats_visibility__'] === 'true') {
            this._showStats();
        }
        this._pixiStatsPlugin.stats.showPanel(0);
    }

    private _toggleStats(): void {
        this._visible ? this._hideStats() : this._showStats();
        this._visible = !this._visible;
        sessionStorage['__stats_visibility__'] = this._visible;
    }

    private _hideStats(): void {
        document.body.removeChild(this._pixiStatsPlugin.stats.dom);
        game.ticker.remove(this._updateStats, this);
    }

    private _showStats(): void {
        document.body.appendChild(this._pixiStatsPlugin.stats.dom);
        game.ticker.add(this._updateStats, this);
    }

    private _updateStats(): void {
        this._pixiStatsPlugin.stats.update();
    }
}
