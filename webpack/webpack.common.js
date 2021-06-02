const { DefinePlugin, IgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const generateDynamicModules = require('../scripts/generate-dynamic-modules');

const manifestJson = require('../manifest.json');
const packageJson = require('../package.json');

const notBabelable = ['core-js', 'node-polyglot', 'webfontloader', '@babel/preset-env', 'tweakpane', 'localforage'];

const getBabelableModules = () =>
    [...Object.keys(packageJson.dependencies), '@pixi', '@pixi-spine', '@replayable']
        .filter((k) => !notBabelable.includes(k))
        .join('|');

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
            environment: {
                // The environment supports arrow functions ('() => { ... }').
                arrowFunction: false,
                // The environment supports BigInt as literal (123n).
                bigIntLiteral: false,
                // The environment supports const and let for variable declarations.
                const: false,
                // The environment supports destructuring ('{ a, b } = obj').
                destructuring: false,
                // The environment supports an async import() function to import EcmaScript modules.
                dynamicImport: false,
                // The environment supports 'for of' iteration ('for (const x of array) { ... }').
                forOf: false,
                // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
                module: false,
            },
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
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: new RegExp(`node_modules/(?!(${getBabelableModules()})/).*`),
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3, proposals: true },
                                    targets: {
                                        browsers: ['ios_saf >= 10', 'and_chr >= 43'],
                                    },
                                    bugfixes: true,
                                    // debug: true,
                                },
                            ],
                            '@babel/preset-typescript',
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
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
