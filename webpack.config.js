var path = require("path");
var webpack = require("webpack");

var config = {
  entry: {
    main: './assets/js/src/main.js'
  },
  output: {
    path: './assets/js/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    // use the main field from the package.json file
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("package.json", ["main"])
    )
  ],
  resolve: {
    // Search in node_modules and src/styles too:
    root: [path.join(__dirname, "node_modules"),
           path.join(__dirname, "assets/js/src")],
    alias: {
      'waypoints_inview': 'waypoints/lib/shortcuts/inview.min.js',
      'waypoints_noframework': 'waypoints/lib/noframework.waypoints.min.js',
    }
  }
};

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
}

module.exports = config;