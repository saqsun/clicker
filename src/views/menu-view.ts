import { lego } from '@armathai/lego';
import { Graphics } from '@pixi/graphics';
import { Scrollbox } from 'pixi-scrollbox';
import { FriendModelEvent, FriendsModelEvent } from '../events/model';
import { FriendModel } from '../models/friend-model';
import { store } from '../models/store';
import { Container } from '../utils/container';
import { MenuItemView } from './menu-item-view';

export class MenuView extends Container {
    private _w: number;
    private _h: number;
    private _bg: Graphics;
    private _menuItems: MenuItemView[] = [];

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
        lego.event.on(FriendModelEvent.costUpdate, this._onFriendCostUpdateUpdate, this);
    }

    public getItemByIndex(index: number): MenuItemView {
        return this._menuItems[index];
    }

    private _build(): void {
        this._buildBg();
    }

    private _buildBg(): void {
        const graphics = new Graphics();
        graphics.beginFill(0x665f4f);
        graphics.drawRoundedRect(0, 0, this._w, this._h, 30);
        graphics.endFill();
        this.addChild((this._bg = graphics));
    }

    private _onFriendsUpdate(friendModels: FriendModel[]): void {
        const scrollbox = new Scrollbox({ boxWidth: this._w - 30, boxHeight: this._h - 30, scrollbarSize: 0 });
        friendModels.forEach((friendModel, i) => {
            const sprite = scrollbox.content.addChild(
                new MenuItemView(
                    this._w - 30,
                    100,
                    friendModel.damage,
                    friendModel.cost,
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
        scrollbox.y = this._bg.y + 15;
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

    private _onFriendCostUpdateUpdate(cost: number, preCost: number, uuid: string): void {
        const friendModel = store.game.friends.getFriendByUuid(uuid);
        const menuItem = this.getItemByIndex(friendModel.index);
        menuItem.updateCost(cost);
    }
}
