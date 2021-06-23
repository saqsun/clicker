import { lego } from '@armathai/lego';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Pane } from 'tweakpane';
import { friendConfigs } from '../constants/configs/friend-configs';
import { levelConfigs } from '../constants/configs/level-configs';
import { playerConfig } from '../constants/configs/player-configs';
import { FriendModelEvent, PlayerModelEvent } from '../events/model';

export class ConfigsPaneObservant {
    private _pane: ExtendedPane;
    private _levelsPane: ExtendedPane;
    private _friendsPane: ExtendedPane;
    private _playerPane: ExtendedPane;

    public constructor() {
        ConfigsPaneObservant._setStyle();
        this._pane = <ExtendedPane>new Pane({
            title: 'Configs',
            expanded: false,
        });
        const tab = this._pane.addTab({
            pages: [{ title: 'Levels' }, { title: 'Player' }, { title: 'Friends' }],
        });
        [this._levelsPane, this._playerPane, this._friendsPane] = tab.pages;
        this._addPlayerBindings();
        this._addLevelsBindings();
        this._addFriendsBindings();
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

        lego.event.on(PlayerModelEvent.moneyUpdate, this._onPlayerMoneyUpdate, this);
        lego.event.on(FriendModelEvent.costUpdate, this._onFriendCostUpdate, this);
        lego.event.on(FriendModelEvent.damageUpdate, this._onFriendDamageUpdate, this);

        lego.event.on(PlayerModelEvent.damageUpdate, this._onPlayerDamageUpdate, this);
        lego.event.on(PlayerModelEvent.updateCostUpdate, this._onPlayerUpdateCostUpdate, this);
        lego.event.on(PlayerModelEvent.dmgPlusUpdate, this._onPlayerDmgPlusUpdate, this);
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
        this._playerPane.addInput(playerConfig, 'money', { step: 1 });
        this._playerPane.addInput(playerConfig, 'updateCost', { step: 1 });
        this._playerPane.addInput(playerConfig, 'dmgPlus', { step: 1 });
    }

    private _addFriendsBindings(): void {
        friendConfigs.forEach((l, i) => {
            const levelFolder = <ExtendedPane>this._friendsPane.addFolder({
                title: `${l.name}`,
                expanded: i === 0, // optional
            });
            // const tab = levelFolder.addTab({
            //     pages: [{ title: 'Bots' }, { title: 'Boss' }],
            // });
            levelFolder.addInput(l, 'damage', { step: 1 });
            levelFolder.addInput(l, 'cost', { step: 1 });
            levelFolder.addInput(l, 'activationLevel', { step: 1 });
            levelFolder.addInput(l, 'actionTime', { step: 1 });
            levelFolder.addInput(l, 'dmgPlus', { step: 1 });

            this._friendsPane.addSeparator();
        });
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
            console.warn(bots.incrementHp);
            botsTab.addInput(bots, 'count', { disabled: true, step: 1 });
            botsTab.addInput(bots, 'startHp', { label: 'start hp', step: 1 });
            botsTab.addInput(bots, 'incrementHp', { label: 'incrementHp', step: 1 });
            botsTab.addInput(bots, 'money', { label: 'money', step: 1 });

            bossTab.addInput(boss, 'incrementHp', { label: 'incrementHp', step: 1 });
            bossTab.addInput(boss, 'money', { label: 'money', step: 1 });

            this._levelsPane.addSeparator();
        });
        const levels = document.getElementsByClassName('tp-brkv tp-v-fst tp-v-vfst tp-v-lst')[0];
        levels.classList.add('levels');
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
                title: 'Export',
            })
            .on('click', () => this._export());

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

    private async _export(): Promise<void> {
        const zip = new JSZip();
        zip.file('level-configs.json', JSON.stringify(levelConfigs));
        zip.file('player-configs.json', JSON.stringify(playerConfig));
        zip.file('friends-configs.json', JSON.stringify(friendConfigs));
        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, 'game-configs.zip');

        // game.resetConfigs();
        // const urlSearchParams = new URLSearchParams().toString();
        // window.location.search = urlSearchParams;
    }

    private _togglePane(): void {
        this._pane.hidden = !this._pane.hidden;
        sessionStorage['__tweakpane_hidden__'] = this._pane.hidden;
    }

    private _onPlayerMoneyUpdate(money: number): void {
        playerConfig.money = money;
        this._pane.refresh();
    }

    private _onPlayerDamageUpdate(damage: number): void {
        playerConfig.damage = damage;
        this._pane.refresh();
    }

    private _onPlayerDmgPlusUpdate(dmgPlus: number): void {
        playerConfig.dmgPlus = dmgPlus;
        this._pane.refresh();
    }

    private _onPlayerUpdateCostUpdate(updateCost: number): void {
        playerConfig.updateCost = updateCost;
        this._pane.refresh();
    }

    private _onFriendCostUpdate(): void {
        this._pane.refresh();
    }

    private _onFriendDamageUpdate(): void {
        this._pane.refresh();
    }
}
