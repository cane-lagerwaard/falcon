import { ApolloLink } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

/**
 * This method expands flatten Apollo cache value into a nested object
 * @param {object} state Apollo state object
 * @param {string} key Apollo state key
 * @return {object} Expanded object
 */
export const expandValue = (state, key) => {
  const value = Object.assign({}, state[key]);
  Object.keys(value).forEach(vKey => {
    const vValue = value[vKey];
    if (typeof vValue === 'object' && vValue.generated && vValue.id) {
      value[vKey] = expandValue(state, vValue.id);
    }
    if (vValue.type === 'json') {
      value[vKey] = vValue.json;
    }
  });
  return value;
};

/**
 * @typedef {object} FalconApolloLinkStateConfig
 * @property {object} defaults https://www.apollographql.com/docs/link/links/state.html#defaults
 * @property {object} resolvers https://www.apollographql.com/docs/link/links/state.html#resolver
 */

/**
 * @typedef {object} FalconApolloClientConfig
 * @property {boolean} [isBrowser=false] Boolean flag to determine the current environment
 * @property {object} [initialState={}] Object to restore Cache data from
 * @property {string} [serverUri="http://localhost:4000/graphql"] ApolloServer URL
 * @property {FalconApolloLinkStateConfig} [clientState={}] https://www.apollographql.com/docs/link/links/state.html
 */

/**
 * Creates an ApolloClient instance with the provided arguments
 * @param {FalconApolloClientConfig} config Falcon configuration for creating ApolloClient instance
 * @return {ApolloClient} ApolloClient instance
 */
export default (config = {}) => {
  // disabling 'addTypename' option to avoid manual setting "__typename" field
  const addTypename = false;
  const { extraLinks = [], isBrowser = false, initialState = {}, clientState = {}, headers } = config;

  let apolloClient;
  if (isBrowser) {
    apolloClient = expandValue(initialState, '$ROOT_QUERY.config.apolloClient');
  } else {
    const { defaults } = clientState || {};
    const { config: clientStateConfig } = defaults || {};
    ({ apolloClient = {} } = clientStateConfig || {});
  }

  const { httpLink: httpLinkConfig = {}, config: clientConfig = {} } = apolloClient;

  const cache = new InMemoryCache({ addTypename }).restore(initialState || {});
  const linkState = withClientState({
    cache,
    ...clientState
  });
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    ...httpLinkConfig,
    fetch,
    headers
  });

  return new ApolloClient({
    ...clientConfig,
    cache,
    connectToDevTools: isBrowser && process.env.NODE_ENV !== 'production',
    ssrMode: !isBrowser,
    addTypename,
    link: ApolloLink.from([...extraLinks, linkState, httpLink])
  });
};
