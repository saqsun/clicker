const { readdirSync } = require('fs');
const path = require('path');
const isFile = require('./is-file');

module.exports = (p) =>
    readdirSync(p)
        .map((name) => path.join(p, name))
        .filter(isFile);
