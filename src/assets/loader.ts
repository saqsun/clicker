/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseTexture, Texture } from '@pixi/core';
import { ILoaderResource, Loader } from '@pixi/loaders';
import { ISpritesheetData, Spritesheet } from '@pixi/spritesheet';
import { EventEmitter } from '@pixi/utils';
import WebFontLoader from 'webfontloader';
import { assets } from '.';
import { spines } from './spines';
import { textures } from './textures';

const imageExtension = ['png', 'jpg', 'jpeg'];

enum SpinesAttachmentType {
    region = 'region',
    mesh = 'mesh',
}

function spritesheetMiddleware(resource: ILoaderResource, next: () => void): void {
    if (!imageExtension.includes(resource.extension)) {
        next();
        return;
    }
    const { atlases }: { atlases: AtlasAsset } = assets;
    const { url } = resource;
    const atlasKey = Object.keys(atlases).find((key) => {
        const { image } = atlases[key];
        return image === url;
    });
    if (!atlasKey) {
        next();
        return;
    }
    const { json, image } = atlases[atlasKey];
    const atlas = new Spritesheet(BaseTexture.from(image), <ISpritesheetData>(<unknown>json));
    atlas.parse(() => next());
}

export class AssetsLoader extends EventEmitter {
    private _loader: Loader;
    private _loading = false;

    public constructor() {
        super();
        this._loader = Loader.shared;
        this._loader.use(spritesheetMiddleware);
    }

    public get loading(): boolean {
        return this._loading;
    }

    public async load(progress: (progress: number) => void): Promise<{ [name: string]: ILoaderResource }> {
        return new Promise(async (resolve, reject) => {
            this._loading = true;
            for (const asset in assets) {
                switch (asset) {
                    case 'fonts':
                        await this._loadFonts(<FontAsset>(<unknown>assets[asset]));
                        break;
                    case 'sound':
                        await this._loadSounds(<SoundAsset>assets[asset]);
                        break;
                    case 'spines':
                        break;
                    case 'atlases':
                        await this._loadAtlases(assets[asset]);
                        break;
                    case 'particles':
                        break;
                    default:
                        reject(`Unknown asset type "${asset}"`);
                }
            }

            const progressId = this._loader.onProgress.add((loader: { progress: number }) => progress(loader.progress));

            const completeId = this._loader.onComplete.add(async (loader: Loader) => {
                this._loader.onProgress.detach(progressId);
                this._loader.onProgress.detach(completeId);
                this._loader.onProgress.detach(errorId);
                this._createSpines(assets['spines']);
                this._loading = false;
                resolve(loader.resources);
            });

            const errorId = this._loader.onError.add(() => {
                this._loader.onProgress.detach(progressId);
                this._loader.onProgress.detach(completeId);
                this._loader.onProgress.detach(errorId);
                reject("Can't load the asset.");
            });

            this._loader.load();
        });
    }

    private _loadFonts(asset: FontAsset): Promise<void> {
        if (Object.entries(asset.config).length === 0) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            WebFontLoader.load({
                ...asset.config,
                active: () => {
                    resolve();
                },
                inactive: () => {
                    reject('None of the fonts could be loaded.');
                },
            });
        });
    }

    private async _loadSounds(asset: SoundAsset): Promise<void> {
        if (Object.entries(asset).length === 0) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            const { sound } = require('@pixi/sound');
            sound.add('spritemap', {
                url: asset.url,
                sprites: asset.spritemap,
                preload: true,
                loaded: resolve,
            });
        });
    }

    private _createSpines(asset: SpineAsset): void {
        if (__SPINE__) {
            for (const s in asset) {
                const json = asset[s];
                const { animations, slots, skins } = json;
                const attachments: string[] = [];

                Object.keys(animations).forEach((k) => {
                    const { slots = {} } = animations[k];
                    Object.keys(slots).forEach((s) => {
                        const { attachment = [] } = slots[s];
                        attachment.forEach((a) => {
                            const { name } = a;
                            if (!attachments.includes(name)) {
                                attachments.push(name);
                            }
                        });
                    });
                });

                slots.forEach((slot) => {
                    const { attachment } = slot;
                    if (!attachments.includes(attachment)) {
                        attachments.push(attachment);
                    }
                });

                skins.forEach((skin) => {
                    const { attachments: skinAttachments } = skin;
                    Object.keys(skinAttachments).forEach((k1) => {
                        const attachment = skinAttachments[k1];
                        Object.keys(attachment).forEach((k2) => {
                            const { type } = attachment[k2];
                            if (!type || type === SpinesAttachmentType.region || type === SpinesAttachmentType.mesh) {
                                let path = k2;
                                const concreteAttachment = attachment[k2];
                                if (Object.prototype.hasOwnProperty.call(concreteAttachment, 'path')) {
                                    path = concreteAttachment.path;
                                }
                                if (!attachments.includes(path)) {
                                    attachments.push(path);
                                }
                            }
                        });
                    });
                });
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { TextureAtlas, AtlasAttachmentLoader, SkeletonJson } = require('pixi-spine');
                const atlas = new TextureAtlas();
                const allTextures: { [key: string]: Texture } = {};
                attachments.forEach((attachment) => {
                    if (Object.prototype.hasOwnProperty.call(textures, attachment)) {
                        allTextures[attachment] = Texture.from(textures[attachment as keyof typeof textures] as string);
                    }
                });

                atlas.addTextureHash(allTextures, true);
                const spineAtlasLoader = new AtlasAttachmentLoader(atlas);
                const spineJsonParser = new SkeletonJson(spineAtlasLoader);
                //@ts-ignore
                spines[s as keyof typeof spines].skeleton = spineJsonParser.readSkeletonData(json);
            }
        }
    }

    private _loadAtlases(spritesheets: AtlasAsset): Promise<void> {
        if (Object.entries(spritesheets).length === 0) {
            return Promise.resolve();
        }
        Object.keys(spritesheets).forEach((spritesheet: keyof typeof spritesheets) => {
            this._loader.add(spritesheets[spritesheet].image);
        });
        return Promise.resolve();
    }
}
