module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                modules: false,
                shippedProposals: true,
                loose: true,
            },
        ]
    ],
    plugins: ['@babel/plugin-transform-runtime'],
};
