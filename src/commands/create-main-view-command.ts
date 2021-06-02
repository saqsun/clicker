import { MainView } from '../views/main-view';

export const createMainViewCommand = (): void => {
    game.stage.addChild(new MainView());
};
