type FontAsset = { config: WebFont.Config };

type SoundAsset = {
    spritemap: Record<string, { start: number; end: number; loop: boolean }>;
    url: string;
};

type AtlasAsset = Record<string, { json: string; image: string }>;

type SpineAsset = Record<
    string,
    {
        skins: [{ attachments: { [key: string]: { [key: string]: { type?: string; path?: string } } } }];
        slots: { attachment: string }[];
        animations: { [key: string]: { slots: { [key: string]: { attachment: { name?: string }[] } } } };
    }
>;
