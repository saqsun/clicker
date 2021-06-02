import { textures } from '../../assets/textures';

export const getBackgroundViewSpriteConfig = (texture: string): SpriteConfig | string => {
    return texture;
};

export const getStarRatingCtaStarFullSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/star_full' as keyof typeof textures];
};

export const getStarRatingCtaStarHalfSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/star_half' as keyof typeof textures];
};

export const getStarRatingCtaIconSpriteConfig = (): SpriteConfig | string => {
    return textures['ui/cta_icon' as keyof typeof textures];
};
