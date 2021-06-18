const path = require('path')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const config = {
    entry: {
        main: ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[fullhash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx?)$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new ModuleFederationPlugin({
            name: '_main',
            filename: 'remoteEntry.js',
            exposes: {
                // comment this line to make the error go away
                './App': './src/App.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
        hot: true,
        host: 'localhost',
        port: 8002,
        open: true,
    },
}

module.exports = config
