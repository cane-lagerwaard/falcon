const paths = require('./../../paths');

function getClientEnv(target, options, envToBuildIn) {
  const { env, port, publicPath } = options;

  const raw = Object.keys(process.env)
    .filter(x => envToBuildIn.find(e => e === x))
    .reduce(
      (result, x) => {
        result[x] = process.env[x];
        return result;
      },
      {
        NODE_ENV: env,
        BABEL_ENV: env,
        PORT: env === 'development' ? port : undefined,
        BUILD_TARGET: target === 'web' ? 'client' : 'server',
        PUBLIC_PATH: env === 'production' ? publicPath : undefined,
        ASSETS_MANIFEST: paths.appManifest,
        PUBLIC_DIR: env === 'production' ? paths.appBuildPublic : paths.appPublic
      }
    );

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = Object.keys(raw).reduce((result, x) => {
    result[`process.env.${x}`] = JSON.stringify(raw[x]);
    return result;
  }, {});

  return { raw, stringified };
}

module.exports = {
  getClientEnv
};
