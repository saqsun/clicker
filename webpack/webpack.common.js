const { DefinePlugin, IgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const generateDynamicModules = require('../scripts/generate-dynamic-modules');

const manifestJson = require('../manifest.json');
const packageJson = require('../package.json');

module.exports = () => {
    const config = {
        entry: {
            playable: './src/index.ts',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: packageJson.name,
                inject: 'head',
                scriptLoading: 'blocking',
                template: './index.hbs',
            }),
            new DefinePlugin({
                __SPINE__: manifestJson.spine,
                __LEGOLOGGER__: manifestJson.legologger,
                ...generateDynamicModules(),
            }),
        ],
        output: {
            filename: '[name].js',
            path: path.resolve('./dist'),
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: { mode: 'global' },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: `asset/resource`,
                },
                {
                    test: /\.(woff)2?$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(mp3|m4a)$/,
                    type: `asset/resource`,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };

    if (!manifestJson.spine) {
        config.plugins.push(
            new IgnorePlugin({
                checkResource: (resource) => resource.includes('pixi-spine'),
            }),
        );
    }

    if (!manifestJson.legologger) {
        config.plugins.push(
            new IgnorePlugin({
                checkResource: (resource) => resource.includes('@armathai/lego-logger'),
            }),
        );
    }

    return config;
};
