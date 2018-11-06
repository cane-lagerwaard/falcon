import http from 'http';
import Logger from '@deity/falcon-logger';

function falconWebServer() {
  const server = require('./server').default;
  // eslint-disable-next-line
  const app = require('./clientApp');
  const bootstrap = require('./clientApp/bootstrap').default;
  // eslint-disable-next-line
  const assetsManifest = require(process.env.ASSETS_MANIFEST);

  /**
   * Creates an instance of Falcon web server
   * @param {ServerAppConfig} props Application parameters
   * @return {WebServer} Falcon web server
   */
  return server({
    App: app.default,
    clientApolloSchema: app.clientApolloSchema,
    configuration: bootstrap,
    webpackAssets: {
      clientJs: assetsManifest.client.js,
      clientCss: assetsManifest.client.css,
      vendorsJs: assetsManifest.vendors.js,
      webmanifest: assetsManifest[''].webmanifest
    }
  });
}

const server = falconWebServer();
let currentWebServerHandler = server.callback();

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
const httpServer = http.createServer(currentWebServerHandler);
const port = parseInt(process.env.PORT, 10) || 3000;
httpServer.listen(port, error => {
  if (error) {
    Logger.error(error);
  }

  Logger.log(`🚀  Client ready at http://localhost:${port}`);
  server.started();
});

if (module.hot) {
  Logger.log('✅  Server-side HMR Enabled!');

  module.hot.accept(['./server', './clientApp', './clientApp/bootstrap'], () => {
    Logger.log('🔁  HMR: Reloading server...');

    try {
      const newHandler = falconWebServer().callback();
      httpServer.removeListener('request', currentWebServerHandler);
      httpServer.on('request', newHandler);
      currentWebServerHandler = newHandler;
      Logger.log('✅  HMR: Server reloaded.');
    } catch (error) {
      Logger.log('🛑  HMR: Reloading server failed, syntax error!');
    }
  });
}
