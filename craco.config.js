module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          fs: false, // Disable fs module
          path: false, // Also disable path if necessary
        };
        return webpackConfig;
      },
    },
  };
  