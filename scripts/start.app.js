const webpack = require('webpack');
const path = require('path');

const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('../webpack/webpack.dev')();

const bootstrap = require('./bootstrap');

const port = 8080;

(async () => {
    try {
        await bootstrap();
        console.log('Starting the dev web server...');
        const server = new WebpackDevServer(webpack(devConfig), {
            // watchOptions: { aggregateTimeout: 0, ignored: /assets/, poll: true },
            watchOptions: { aggregateTimeout: 0, poll: true },
            stats: { all: false, error: true, colors: true },
            clientLogLevel: 'error',
            hot: true,
            overlay: true,
            publicPath: '/',
            public: `${require('ip').address()}:${port}`,
        });
        server.listen(port);
    } catch (err) {
        console.error(err);
    }
})();
