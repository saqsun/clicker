const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const generateImageLoaderConfig = require('../scripts/generate-image-loader-config');

module.exports = () => {
    const commonConfigs = common();
    return merge(commonConfigs, {
        mode: 'production',
        module: {
            rules: [...generateImageLoaderConfig()],
        },
        optimization: {
            splitChunks: { chunks: 'all' },
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        output: {
                            comments: false,
                            ascii_only: true,
                        },
                    },
                }),
            ],
        },
    });
};
