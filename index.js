const LINARIA_EXTENSION = '.linaria.module.css';

function traverse(rules) {
  for (let rule of rules) {
    if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === 'function'
      ) {
        let nextGetLocalIdent = rule.options.modules.getLocalIdent;
        rule.options.modules.mode = 'local';
        rule.options.modules.auto = true;
        rule.options.modules.exportGlobals = true;
        rule.options.modules.exportOnlyLocals = false;
        rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
          if (context.resourcePath.includes(LINARIA_EXTENSION)) {
            return exportName;
          }
          return nextGetLocalIdent(context, _, exportName, options);
        };
      }
    }
    if (typeof rule.use === 'object') {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf);
    }
  }
}

function getLinariaIgnore(linariaConfig) {
  if (linariaConfig && linariaConfig.rules) {
    const ignoreRule = linariaConfig.rules.find(rule =>
      rule.action && rule.action === 'ignore' && rule.test
    );
    return ignoreRule && ignoreRule.test
  }
  return null;
}

module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      traverse(config.module.rules);
      config.module.rules.push({
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: getLinariaIgnore(nextConfig.linaria) || /node_modules/,
        use: [
          {
            loader: require.resolve('@linaria/webpack-loader'),
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
              ...(nextConfig.linaria || {}),
              extension: LINARIA_EXTENSION,
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};
