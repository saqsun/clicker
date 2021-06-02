export const getScrollAnimationData = (): AnimationConfig => {
    return {
        frames: Array(6)
            .fill(0)
            .map((_, i) => `animations/scroll/${i}.png`),
        speed: 0.3,
        loop: false,
    };
};
