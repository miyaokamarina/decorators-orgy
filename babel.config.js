module.exports = {
    presets: [['@babel/env', { targets: { node: true } }]],
    plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
        '@babel/plugin-proposal-class-properties',
    ],
};
