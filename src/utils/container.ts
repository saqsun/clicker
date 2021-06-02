import { lego } from '@armathai/lego';
import { PixiGrid } from '@armathai/pixi-grid';
import { Container as PixiContainer } from '@pixi/display';

export class Container extends PixiContainer {
    public destroy(options?: { children?: boolean; texture?: boolean; baseTexture?: boolean }): void {
        lego.event.removeListenersOf(this);

        super.destroy(options);
    }
}

PixiGrid.prototype.destroy = Container.prototype.destroy;
