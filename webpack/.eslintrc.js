module.exports = {
    root: true,
    extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
    plugins: ['prettier'],
    parserOptions: {
        // Only ESLint 6.2.0 and later support ES2020.
        ecmaVersion: 2020,
    },
    rules: {
        'prettier/prettier': 'error',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-require': 'off',
    },
};
