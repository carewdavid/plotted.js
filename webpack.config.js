const path = require('path');

module.exports = {
    entry : './src/svg.ts',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: 'development',
    output: {
        filename: 'plotted.js',
        path: path.resolve(__dirname, 'dist')
    }

}