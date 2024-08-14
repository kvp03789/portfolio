const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: false,
    entry: './src/index.js',
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/img/[name][hash][ext]',
        clean: true
    },
    
    
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                type: "asset/resource"
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/template.html'
      }),]
}