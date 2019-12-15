const webpack = require('webpack')

export default {
  webpack(config, env, helpers, options) {
    config.plugins[2] = new webpack.ProvidePlugin({
      T: 'react-toast-mobile'
    })
    if (config.devServer) {
      config.devServer.publicPath = '/'
    } else {
      config.output.path = __dirname + '/build/'
      config.output.publicPath = '//land.xiaomi.net/mcfe/ai-redpaper-fe/'
    }
  }
}
