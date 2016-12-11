module.exports = {
    devtool: 'source-map',
    entry: {
        app: './index.js'
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js)$/,                   
                loader: 'babel',                          //对匹配的文件进行处理的loader 
                exclude: /node_modules/                   //排除node module中的文件
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
}