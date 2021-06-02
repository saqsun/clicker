import { Pane } from 'tweakpane';
import { levelConfigs } from '../constants/configs/level-configs';
import { playerConfig } from '../constants/configs/player-configs';

export class ConfigsPaneObservant {
    private _pane: ExtendedPane;
    private _levelsPane: ExtendedPane;
    private _playerPane: ExtendedPane;

    public constructor() {
        ConfigsPaneObservant._setStyle();
        this._pane = <ExtendedPane>new Pane({
            title: 'Configs',
            expanded: true,
        });
        const tab = this._pane.addTab({
            pages: [{ title: 'Levels' }, { title: 'Player' }],
        });
        [this._levelsPane, this._playerPane] = tab.pages;
        this._addPlayerBindings();
        this._addLevelsBindings();
        this._addActionBindings();

        this._pane.on('change', () => {
            game.updateConfigs();
        });

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'c') {
                this._togglePane();
            }
        });
        if (sessionStorage['__tweakpane_hidden__'] === 'true') {
            this._togglePane();
        }
    }

    private static _setStyle(): void {
        const paneStyle = document.createElement('style');
        paneStyle.innerHTML = `
            .tp-dfwv {
                min-width: 360px;
            }`;
        document.getElementsByTagName('head')[0].appendChild(paneStyle);
    }

    private _addPlayerBindings(): void {
        this._playerPane.addInput(playerConfig, 'damage', { step: 1 });
    }

    private _addLevelsBindings(): void {
        levelConfigs.forEach((l, i) => {
            const levelFolder = <ExtendedPane>this._levelsPane.addFolder({
                title: `${i + 1}`,
                expanded: i === 0, // optional
            });
            const tab = levelFolder.addTab({
                pages: [{ title: 'Bots' }, { title: 'Boss' }],
            });
            const [botsTab, bossTab] = tab.pages;
            const { bots, boss } = l;

            botsTab.addInput(bots, 'count', { disabled: true, step: 1 });
            botsTab.addInput(bots, 'startHp', { label: 'start hp', step: 1 });
            botsTab.addInput(bots.incrementHp, 'min', { label: 'min hp increment %', step: 1 });
            botsTab.addInput(bots.incrementHp, 'max', { label: 'max hp increment %', step: 1 });

            bossTab.addInput(boss.incrementHp, 'min', { label: 'min hp increment %', step: 1 });
            bossTab.addInput(boss.incrementHp, 'max', { label: 'max hp increment %', step: 1 });

            this._levelsPane.addSeparator();
        });
    }

    private _addActionBindings(): void {
        this._pane
            .addButton({
                title: 'Apply',
            })
            .on('click', () => this._apply());

        this._pane.addSeparator();

        this._pane
            .addButton({
                title: 'Reset',
            })
            .on('click', () => this._reset());
    }

    private _apply(): void {
        game.saveConfigs();
    }

    private _reset(): void {
        game.resetConfigs();
        const urlSearchParams = new URLSearchParams().toString();
        window.location.search = urlSearchParams;
    }

    private _togglePane(): void {
        this._pane.hidden = !this._pane.hidden;
        sessionStorage['__tweakpane_hidden__'] = this._pane.hidden;
    }
}
