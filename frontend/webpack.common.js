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
    devServer: {
        host: '0.0.0.0',
        // disableHostCheck: true, // Disables host header checking
        allowedHosts: 'all', // Allows all hosts (optional but more secure than disabling host check)
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