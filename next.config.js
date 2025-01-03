const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  trailingSlash: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add the Node.js polyfill plugin
    config.plugins.push(new NodePolyfillPlugin());

    // Add fallbacks for Node.js modules like 'stream' and 'util'
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      // Add more fallbacks if needed
    };

    return config;
  },
};
