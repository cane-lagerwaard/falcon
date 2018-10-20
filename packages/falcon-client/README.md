# Falcon Client

This is a `@deity/falcon-client` host for your shop.

Falcon Client is the entrypoint for frontend features of Falcon stack. It acts as host for your shop - provides app building capabilities and features set which can be used to create your desired shop application.

## Installation

With npm:

```bash
npm install @deity/falcon-client
```

or with yarn:

```bash
yarn add @deity/falcon-client
```

## Quick Start

Use the project generator:

[Create-falcon-app](https://github.com/deity-io/falcon/tree/master/packages/create-falcon-app)

Out of the box, it connects to a public back-end service (Magento & WordPress), so you can start developing right away.

<!--
## How to use [TODO]

below description is almost done, but it require some changes inside `falcon-client`, for example:
- TypeScript should be optional,
- make sure that peerDependencies are configured in right way
- webmanifest should be also optional
- ./index.js should be transpiled by babel (right now only files from ./src/ are)
 -->

<!--
In order to configure `falcon-client` you need to initialize empty project, make sure that entry point is `index.js`

```bash
mkdir my-shop && cd my-shop
npm init
```

install minimal set of dependencies:

```bash
npm install --save @deity/falcon-client graphql graphql-tag i18next prop-types react react-apollo react-async-component react-dom react-i18next react-router-dom typescript
```

according to [API contract](#api-contract) following files `index.js`, `falcon-client.config.js` and `razzle.config.js` needs to be created:

```bash
touch index.js falcon-client.config.js razzle.config.js
```

in `index.js` add

```jsx
import React from 'react';

export default () => <p>my app</p>;
```

and in `razzle.config.js`

```js
const { razzlePluginFalconClient } = require('@deity/falcon-client');

module.exports = {
  plugins: [razzlePluginFalconClient({})]
};
```

after that you are ready to run `my-shop` application:

```bash
node_modules/.bin/falcon-client start
``` -->

## Exposed Commands

Falcon Client exposes set of handy commands:

### `falcon-client start`

Runs the project in development mode. You can view your application at `http://localhost:3000`.

The page will reload if you make edits (both backend and frontend HMR is enabled).

### `falcon-client start -- --inspect=[host:port]`

To debug the node server, you can use `falcon-client start --inspect`. This will start the node server and enable the inspector agent. The `=[host:port]` is optional and defaults to `=127.0.0.1:9229`. For more information, see [this](https://nodejs.org/en/docs/guides/debugging-getting-started/).

### `falcon-client start -- --inspect-brk=[host:port]`

This is the same as --inspect, but will also break before user code starts. (to give a debugger time to attach before early code runs) For more information, see [this](https://nodejs.org/en/docs/guides/debugging-getting-started/).

### `rs`

If your application is running, and you need to manually restart your server, you do not need to completely kill and rebundle your application. Instead you can just type `rs` and press enter in terminal.

### `falcon-client test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

If you want to know more about how to test, see [this](#testing)

### `falcon-client build`

Builds the app for production, and outputs to the `./build` folder.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## API contract

Application needs to have the following files `index.js`, `razzle.config.js`, and optionally `falcon-client.config.js`. Each of them should be placed in application root directory.

### `index.js` (required)

This is an application entry point which needs to export valid React element `React.ReactElement<any>` as default:

```js
import App from './src/App';

export default App;
```

In order to use your custom Apollo Schema you need to export it via `clientApolloSchema`:

```js
import clientApolloSchema from './src/clientState';

export { clientApolloSchema };
```

For more information se [this](#state-management)

### `razzle.config.js` (required)

This is an build time configuration file which is based on [razzle](https://github.com/jaredpalmer/razzle). `razzlePluginFalconClient` is used to setting up entire build process:

```js
const { razzlePluginFalconClient } = require('@deity/falcon-client');

module.exports = {
  plugins: [razzlePluginFalconClient()]
};
```

In order to customize it please install razzle plugin or write your own according to [razzle](https://github.com/jaredpalmer/razzle#customization) documentation.

It is recommended to have `razzlePluginFalconClient` on first place in `plugins` array.

#### razzlePluginFalconClient

By default support for following is turned on:

- [HMR](https://webpack.js.org/concepts/hot-module-replacement/) - page auto-reload if you make edits (on both backend and frontend)
- TypeScript - you can (it is not mandatory) to write your code in TypeScript
- ESLint with [Prettier](https://github.com/prettier/prettier) - to keep your code base clean and consistent, [see presets](https://github.com/deity-io/falcon/tree/master/packages/falcon-dev-tools/eslint-config-falcon)

Please bear in mind that falcon Client plugin for Razzle provide its own configuration options and they are described in details later in documentation:

- [internationalization](#internationalization)

### `falcon-client.config.js`

This is an runtime configuration file (fully optional).

```js
const config = require('config');

export default {
  config: { ...config },
  onServerCreated: server => {},
  onServerInitialized: server => {},
  onServerStarted: server => {}
};
```

#### config

This is configuration object used to setup `@deity/falcon-client`

`config: object`

- `logLevel: string` - (default: `'error'`) [@deity/falcon-logger](https://github.com/deity-io/falcon/tree/master/packages/falcon-logger) logger level
- `serverSideRendering: boolean` - (default `true`) switch to control whether the [SSR](#server-side-rendering) is enabled
- `useWebManifest: boolean` - (default `true`) determines if Web App Manifest should be included in output bundle, [see the details](#webmanifest)
- `googleTagManager: object` - Google Tag Manager configuration, [see the details](#google-tag-manager)
- `i18n: object` - internationalization configuration, [see the details](#internationalization)
- `menus: object` - menus configuration [TODO]
- `apolloClient` - ApolloClient configuration object
  - `apolloClient.httpLink` - configuration object that will be passed to the
    `apollo-link-http` method which defines HTTP link the remote Falcon Server
    ([available options](https://www.apollographql.com/docs/link/links/http.html#options))
  - `apolloClient.config` - configuration object that will be passed to the
  main `ApolloClient` constructor
  ([available options](https://www.apollographql.com/docs/react/api/apollo-client.html#apollo-client))

All configuration passed by `config` is accessible via `ApolloClient`, which mean you can access any of its property via graphQL query.

In order to retrieve `logLevel` you can run following query:

```graphql
gql`
  query LNG {
    config @client {
        logLevel
      }
    }
  }
`
```

It is also possible to extend `config` object about your custom properties.

#### Runtime hooks

Falcon Client exposes set of hooks to which you can attache custom logic:

- `onServerCreated(server: Koa)` - handler invoked immediately after koa server creation
- `onServerInitialized(server: Koa)` - handler invoked immediately after koa server setup (when middlewares like handling errors, serving static files and routes were set up)
- `onServerStarted(server: Koa)` - handler invoked when koa server started with no errors

## Environment Variables

### Build-time Variables

- `process.env.NODE_ENV` - `development` or `production`
- `process.env.VERBOSE`- default is `false`, setting this to true will not clear the console when you make edits in development (useful for debugging).
- `process.env.PORT`- default is `3000`, unless changed
- `process.env.HOST`- default is `0.0.0.0`

## State Management

[TODO]

### Apollo Link State

### client state

## Routing

In-app routing is based on [react-router](https://github.com/ReactTraining/react-router) in version 4. If you are not familiar with it, see [this](https://reacttraining.com/react-router/web/example/basic)

Falcon Client support async routes, more information can be found in [Code Splitting](#code-splitting) section.

### Falcon Dynamic Routing

[TODO]

## PWA

Falcon client offers wide range of Progressive Web App features out of the box

### Webmanifest

The web app manifest provides information about an application (such as its name, author, icon, and description) in a JSON text file. The manifest informs details for websites installed on the homescreen of a device, providing users with quicker access and a richer experience.

For more information, see [this](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Web App Manifest file should be located in `./src/manifest.webmanifest` and could be edited according to your needs. Pleas bear in mind that paths to icons files should be relative:

```json
{
  "icons": [{ "src": "./assets/logo.svg", "sizes": "48x48", "type": "image/svg" }]
}
```

During build process webpack will take care about resolving file paths and generating hashes in order to improve file caching.

### Web Cache

All files emitted by webpack build into `./build/public/static/` directory contain hash part in file name, which is generated from its content. It allow us to set browser cache via setting `Cache-Control: max-age=31536000` header, which is 1 year.

### Service Worker

Production build generate Service Worker (file `./build/static/sw.js`) which is automatically installed in web browser. It cache all files from `./build/public/` and turns on offline capabilities.

For more information see [this](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)

## Code Splitting

This feature splits your code into various bundles which are loaded on demand. It is used to achieve smaller bundles and control resource load prioritization which, have a major impact on load time. To specify splitting point you need to import modules in asynchronous manner. To make it working with React, Falcon Client use [async component](#async-components).

### Async components

Async components is based on [react-async-component](https://github.com/ctrlplusb/react-async-component)

It is highly recommended to have each page component asynchronous. Then page chunks does not impact them self, as they contain only necessary amount of code.

To convert React Component into component which can be latter fetch on demand, you need to wrap it with `asyncComponent` function:

```jsx
import { asyncComponent } from 'react-async-component';

const AsyncHome: asyncComponent({
  resolve: () => import('./src/pages/Home')
})

export default () => (
  <Switch>
    <Route exact path="/" component={AsyncHome} />
    {
      /// ...
    }
  </Switch>
)
```

For more information see [this](https://github.com/ctrlplusb/react-async-component)

### Vendors bundle

`vendors.js` is chunk which combine only common project dependencies into single file. As they should not change often, even between subsequent releases, it allows to turn on long term caching for rather big file.

## Internationalization

Internationalization is based on [i18next](https://www.i18next.com/).

All i18n resources should be placed in `./i18n` directory, and folder structure should follow pattern `{{lng}}/{{ns}}.json`. Which means each language needs to have own directory with `json` file per namespace:

```
i18n
  |-en
    |-common.json
    |-blog.json
    |-...
  |-...
```

Default namespace is `common` and there is also fallback configured to it, in case if translation key can not be found in namespaces defined in `translate()` HoC from `react-i18next` module.

HMR for translation files is supported.

### Configuration

Configuration options base on [i18next](https://www.i18next.com/overview/configuration-options) and you can change them via configuration `config.i18n` exported from `falcon-client.config.js`

- `lng: string` - (default: `en`) default application language
- `fallbackLng: string` - (default: `en`) language to use if translations in selected language are not available
- `whitelist: string[]` - (default: `['en']`) available languages, it may be be narrowed, if installed extensions does not support all of specified
- `ns: string[]` - (default: `['common']`) namespaces used by application
- `debug: boolean` - (default: `false`) i18next debug mode switch
- `resources: object` - (default: `undefined`) allows to inject translations inline, useful during testing

### Using default resources

Default resources (if configured) will be merged with your custom translations from `./i18n` directory.

To use default resources you need to install `@deity/falcon-i18n` npm module (or any other compatible) which contains default translations

```bash
npm install --save @deity/falcon-i18n
```

Then in `razzle.config.js` file you need to update `razzlePluginFalconClient` plugin configuration. Add `@deity/falcon-i18n` package name into `resourcePackages` array.

Imported package (like `@deity/falcon-i18n`) can contain more languages and/or namespaces than you are interested in. So if you don't want to use all of them (to save bundle size, or just not to use some namespace as it's not relevant to your project) you can filter them out by using `filter` option - that will instruct webpack to skip items not listed in the `filter` property.

```javascript
razzlePluginFalconClient({
  i18n: {
    resourcePackages: ['@deity/falcon-i18n'],
    filter: {
      lng: ['en'],
      ns: ['common', 'blog']
    }
  }
});
```

Above example configuration will deliver to your project default `common` and `blog` namespaces from English language.

## SEO

To make your shop SEO-friendly, following mechanisms are involved out of the box

### Server Side Rendering

SSR take place when a website is first opened. All operations are carried out on the server and the browser gets an HTML with all information, same as with typical websites with static pages which search engines can index. After JavaScript is loaded the web turns into a "single page app" and works respectively.

### Dynamic meta description

Page title and other meta tags can be dynamically changed directly in `jsx` in any place of your page. It is achieved via [react-helmet](https://github.com/nfl/react-helmet).

To change page title or add any kind of meta tag (e.g. [Open Graph Protocol](http://ogp.me/)) you need to wrap them by `<Helmet />` component:

```jsx
<Helmet defaultTitle="My Shop" titleTemplate="%s | My Shop">
  <meta name="description" content="This is My Shop powered by Deity Falcon" />
  <meta name="theme-color" content="#fff" />
</Helmet>
```

For more examples see [this](https://github.com/nfl/react-helmet#reference-guide)

## Google Analytics

[TODO]

## Google Tag Manager

[See more](https://marketingplatform.google.com/about/tag-manager/)

### Configuration

you can configure Google Tag Manager via `config` property in `falcon-client.config.js`.

`googleTagManager: object`

- `id: string`: (default `null`) Google Tag Manager ID

## Internal Server Error page

`falcon-client` provide default error page for http 500 error. You can override it and provide your own by placing `500.http` file in `./views/errors/` directory.

## Testing

### Mocking `falcon-client`

`falcon-client` exposes `FalconClientMock` component which allows you to setup application context inside unit test environment.
`FalconClientMock` can receive props for mock version of React context provider components used by `falcon-client` internally:

- `apollo: object` - props for `MockProvider` component from `react-apollo`
- `router: object` props for `MemoryRouter` component from `react-router-dom`
- `asyncComponent: object` - props for `AsyncComponentProvider` component from `react-async-component`
- `i18next: object` - props for `I18nextProvider` component from `react-i18next`

example unit test with `FalconClientMock` :

```jsx
import { FalconClientMock } from '@deity/falcon-client/test-utils';

describe('<Component />', () => {
  test('renders without exploding', () => {
    ReactDOM.render(
      <FalconClientMock>
        {
          // your <Component />
        }
      </FalconClientMock>,
      document.createElement('div')
    );
  });
});
```
