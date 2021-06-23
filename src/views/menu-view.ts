import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { Scrollbox } from 'pixi-scrollbox';
import { FriendModelEvent, FriendsModelEvent, PlayerModelEvent } from '../events/model';
import { FriendModel } from '../models/friend-model';
import { store } from '../models/store';
import { Container } from '../utils/container';
import { MenuItemView } from './menu-item-view';

export class MenuView extends Container {
    private _w: number;
    private _h: number;
    private _bg: Graphics;
    private _menuItems: MenuItemView[] = [];
    private _playerItem: MenuItemView;

    public constructor(_w: number, _h: number) {
        super();
        this.name = 'MenuView';
        this._w = Math.max(200, Math.min(900, _w));
        this._h = _h;
        this._build();

        lego.event.on(FriendsModelEvent.friendsUpdate, this._onFriendsUpdate, this);
        lego.event.on(FriendsModelEvent.activatableFriendsUpdate, this._onActivatableFriendsUpdate, this);
        lego.event.on(FriendsModelEvent.upgradeableFriendsUpdate, this._onUpgradeableFriendsUpdate, this);
        lego.event.on(FriendsModelEvent.passiveFriendsUpdate, this._onPassiveFriendsUpdate, this);
        lego.event.on(FriendModelEvent.damageUpdate, this._onFriendDamageUpdateUpdate, this);
        lego.event.on(FriendModelEvent.dmgPlusUpdate, this._onFriendDmgPlusUpdateUpdate, this);
        lego.event.on(FriendModelEvent.costUpdate, this._onFriendCostUpdateUpdate, this);
        lego.event.on(PlayerModelEvent.updateCostUpdate, this._onPlayerUpdateCostUpdate, this);
        lego.event.on(PlayerModelEvent.damageUpdate, this._onPlayerDamageUpdate, this);
        lego.event.on(PlayerModelEvent.isUpgradeableUpdate, this._onPlayerIsUpgradeableUpdate, this);
        lego.event.on(PlayerModelEvent.dmgPlusUpdate, this._onPlayerDmgPlusUpdateUpdate, this);
    }

    public getItemByIndex(index: number): MenuItemView {
        return this._menuItems[index];
    }

    private _build(): void {
        this._buildBg();
        this._buildPlayerItem();
    }

    private _buildBg(): void {
        const graphics = new Graphics();
        graphics.beginFill(0x665f4f);
        graphics.drawRoundedRect(0, 0, this._w, this._h, 30);
        graphics.endFill();
        this.addChild((this._bg = graphics));
    }

    private _buildPlayerItem(): void {
        const playerModel = store.player;
        const playerItem = new MenuItemView(
            this._w - 30,
            100,
            playerModel.damage,
            0,
            playerModel.dmgPlus,
            'player',
            playerModel.uuid,
            0x000000,
        );

        playerItem.x = 15;
        playerItem.y = 15;

        this.addChild((this._playerItem = playerItem));
    }

    private _onFriendsUpdate(friendModels: FriendModel[]): void {
        const scrollbox = new Scrollbox({ boxWidth: this._w - 30, boxHeight: this._h - 145, scrollbarSize: 0 });
        friendModels.forEach((friendModel, i) => {
            const sprite = scrollbox.content.addChild(
                new MenuItemView(
                    this._w - 30,
                    100,
                    friendModel.damage,
                    friendModel.cost,
                    friendModel.dmgPlus,
                    friendModel.name,
                    friendModel.uuid,
                    friendModel.iconColor,
                ),
            );
            // sprite.x += 15;
            sprite.y = (sprite.height + 5) * i;
            this._menuItems.push(sprite);
            this.addChild(scrollbox);
        });
        scrollbox.x = this._bg.x + 15;
        scrollbox.y = this._bg.y + 130;
        scrollbox.update();
    }

    private _onActivatableFriendsUpdate(friendModels: FriendModel[]): void {
        friendModels.forEach((friendModel) => {
            const menuItem = this._menuItems.find((item) => item.friendUuid === friendModel.uuid);
            menuItem.activatedActivateButton();
        });
    }

    private _onUpgradeableFriendsUpdate(friendModels: FriendModel[]): void {
        friendModels.forEach((friendModel) => {
            const menuItem = this._menuItems.find((item) => item.friendUuid === friendModel.uuid);
            menuItem.activatedUpgradeButton();
        });
    }

    private _onPassiveFriendsUpdate(friendModels: FriendModel[]): void {
        friendModels.forEach((friendModel) => {
            const menuItem = this._menuItems.find((item) => item.friendUuid === friendModel.uuid);
            menuItem.activatedPassiveButton();
        });
    }

    private _onFriendDamageUpdateUpdate(damage: number, preDamage: number, uuid: string): void {
        const friendModel = store.game.friends.getFriendByUuid(uuid);
        const menuItem = this.getItemByIndex(friendModel.index);
        menuItem.updateDmg(damage);
    }

    private _onFriendDmgPlusUpdateUpdate(dmgPlus: number, preDmgPlus: number, uuid: string): void {
        const friendModel = store.game.friends.getFriendByUuid(uuid);
        const menuItem = this.getItemByIndex(friendModel.index);
        menuItem.dmgPlus = dmgPlus;
        menuItem.updateDmg(friendModel.damage);
    }

    private _onFriendCostUpdateUpdate(cost: number, preCost: number, uuid: string): void {
        const friendModel = store.game.friends.getFriendByUuid(uuid);
        const menuItem = this.getItemByIndex(friendModel.index);
        menuItem.updateCost(cost);
    }

    private _onPlayerUpdateCostUpdate(cost: number): void {
        const menuItem = this._playerItem;
        menuItem.updateCost(cost);
    }

    private _onPlayerDamageUpdate(dmg: number): void {
        const menuItem = this._playerItem;
        menuItem.updateDmg(dmg);
    }

    private _onPlayerDmgPlusUpdateUpdate(dmgPlus: number): void {
        const menuItem = this._playerItem;
        const { player } = store;
        menuItem.dmgPlus = dmgPlus;
        menuItem.updateDmg(player.damage);
    }

    private _onPlayerIsUpgradeableUpdate(isUpgradeable: boolean): void {
        const menuItem = this._playerItem;
        if (isUpgradeable) {
            menuItem.activatedUpgradeButton();
        } else {
            menuItem.activatedPassiveButton();
        }
    }
}
