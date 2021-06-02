const webpack = require('webpack');

const prodConfig = require('../webpack/webpack.prod')();

const bootstrap = require('./bootstrap');

(async () => {
    await bootstrap();
    webpack(prodConfig, (err, stats) => {
        // uncomment this for more build logs
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            }),
        );
    });
})();
