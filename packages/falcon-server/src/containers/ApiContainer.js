/* eslint-disable no-restricted-syntax, no-await-in-loop */
const Logger = require('@deity/falcon-logger');
const Events = require('./../events');

/**
 * @typedef {object} ApiInstanceConfig
 * @property {string} name Api short-name (example: "api-wordpress")
 * @property {string} package Node package path (example: "@deity/falcon-wordpress-api")
 * @property {object} config Config object to be passed to Api Instance constructor
 */

/**
 * Api Engine acts as a container for API instances:
 * - manages all the instances
 * - returns the instances as dataSources (required by Apollo Server)
 * - collects all endpoints that API classes have to handle outside GraphQL
 */
module.exports = class ApiContainer {
  /**
   * Create an instance.
   * @param {EventEmitter2} eventEmitter EventEmitter
   */
  constructor(eventEmitter) {
    /** @type {ApiDataSourceEndpoint[]} Endpoints collected from extensions */
    this.endpoints = [];
    /** @type {Map<string, ApiDataSource>} Array with API instances */
    this.dataSources = new Map();
    this.eventEmitter = eventEmitter;
  }

  /**
   * Instantiates apis based on passed configuration
   * @param {Object<string, ApiInstanceConfig>} apis Key-value list of APIs configuration
   * @return {undefined}
   */
  async registerApis(apis = {}) {
    for (const apiKey in apis) {
      if (Object.prototype.hasOwnProperty.call(apis, apiKey)) {
        const api = apis[apiKey];

        const { package: pkg, config = {} } = api;
        try {
          const ApiClass = require(pkg); // eslint-disable-line import/no-dynamic-require
          /** @type {ApiDataSource} */
          const apiInstance = new ApiClass({ config, name: apiKey });

          Logger.debug(`ApiContainer: "${apiInstance.name}" added to the list of API DataSources`);
          this.dataSources.set(apiInstance.name, apiInstance);
          if (apiInstance.getEndpoints) {
            Logger.debug(`ApiContainer: Extracting endpoints from "${apiInstance.name}" API DataSource`);
            this.endpoints.push(...apiInstance.getEndpoints());
          }
          await this.eventEmitter.emitAsync(Events.API_DATA_SOURCE_REGISTERED, {
            instance: apiInstance,
            name: apiInstance.name
          });
        } catch (error) {
          Logger.warn(`"${pkg}" package cannot be loaded. Make sure it is installed properly. Details: ${error.stack}`);
        }
      }
    }
  }
};
