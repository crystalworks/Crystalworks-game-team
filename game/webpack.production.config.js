const path = require('path');
const webpack = require('webpack');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/build/custom/');
const phaser = path.join(phaserModule, 'phaser-split.js');
const pixi = path.join(phaserModule, 'pixi.js');
const p2 = path.join(phaserModule, 'p2.js');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/app.js')
        ],
        vendor: ['pixi', 'p2', 'phaser']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendor', 
            filename: 'vendor.bundle.js'
        }),
    ],
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: ['babel-loader'], 
                include: path.join(__dirname, 'src') 
            }, { 
                test: /pixi\.js/, 
                use: ['expose-loader?PIXI'] 
            }, { 
                test: /phaser-split\.js$/, 
                use: ['expose-loader?Phaser'] 
            }, { 
                test: /p2\.js/, 
                use: ['expose-loader?p2'] 
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
}
