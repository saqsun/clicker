const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const generateImageLoaderConfig = require('../scripts/generate-image-loader-config');

const packageJson = require('../package.json');

const notBabelable = [
    'core-js',
    'node-polyglot',
    'webfontloader',
    '@babel/preset-env',
    'tweakpane',
    'localforage',
    'file-saver',
    'jszip',
];

const getBabelableModules = () =>
    [...Object.keys(packageJson.dependencies), '@pixi', '@pixi-spine', '@replayable']
        .filter((k) => !notBabelable.includes(k))
        .join('|');

module.exports = () => {
    const commonConfigs = common();
    return merge(commonConfigs, {
        mode: 'production',
        module: {
            rules: [
                ...generateImageLoaderConfig(),
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
        },
    });
};
