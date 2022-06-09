const path = require('path');

module.exports = {
    entry : './src/plotted.ts',
    target: 'web',
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
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        library: 'Plotted'
    }

}