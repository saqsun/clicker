/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/naming-convention */

declare const __SPINE__: boolean;
declare const __LEGOLOGGER__: boolean;
declare let game: import('../src/game').Game;

type ExtendedPane = import('tweakpane').Pane & {
    hidden: boolean;
    children: {
        controller_: {
            binding: {
                target: { key: string };
                value: { rawValue: unknown };
                emitter: { on: (name: string, handler: (ev) => void) => void };
            };
        };
        disabled: boolean;
    }[];
    addInput: <O extends Record<string, any>, K extends string>(
        object: O,
        key: K,
        opt_params?: import('tweakpane').InputParams,
    ) => import('tweakpane').InputBindingApi<unknown, O[K]> & { disabled: boolean };

    addMonitor: <O extends Record<string, any>, K extends string>(
        object: O,
        key: K,
        opt_params?: import('tweakpane').InputParams,
    ) => import('tweakpane').MonitorBindingApi<O[K]>;

    addFolder: (params: import('tweakpane').FolderParams) => import('tweakpane').FolderApi;

    addButton: (params: import('tweakpane').ButtonParams) => import('tweakpane').ButtonApi;

    addSeparator: (opt_params?: import('tweakpane').SeparatorParams) => import('tweakpane').SeparatorApi;

    addTab: (params: import('tweakpane').TabParams) => import('tweakpane').TabApi;

    on: (name: string, handler: (ev) => void) => void;
};

interface Navigator {
    browserLanguage: string;
    systemLanguage: string;
    userLanguage: string;
}

interface Window {
    game: import('../src/game').Game;
    Game: new () => import('../src/game').Game;
}

interface Document {
    msHidden?: string;
    webkitHidden?: string;
}

type PlayerConfig = { damage: number; money: number };

type BotConfig = {
    count: number;
    startHp: number;
    incrementHp: { min: number; max: number };
    money: number;
};

type BossConfig = {
    incrementHp: { min: number; max: number };
    money: number;
};

type LevelConfig = {
    bots: BotConfig;
    boss: BossConfig;
};

type Callback = EventEmitter.ListenerFn;
