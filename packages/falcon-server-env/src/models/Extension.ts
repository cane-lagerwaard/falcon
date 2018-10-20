import { GraphQLResolveInfo } from 'graphql';
import ApiDataSource from './ApiDataSource';
import { ApiUrlPriority, ConfigurableConstructorParams, FetchUrlResult, ExtensionContainer } from '../types';

export default abstract class Extension<TApiConfig = object> {
  public config: object;
  public name: string;
  public api?: ApiDataSource;
  public apiConfig: TApiConfig | null = null;
  private extensionContainer: ExtensionContainer;

  /**
   * @param {object} config Extension config object
   * @param {string} name Extension short-name
   * @param {ExtensionContainer} extensionContainer Instance of ExtensionContainer
   */
  constructor({
    config = {},
    name,
    extensionContainer
  }: ConfigurableConstructorParams & { extensionContainer: ExtensionContainer }) {
    this.name = name || this.constructor.name;
    this.config = config;
    this.extensionContainer = extensionContainer;
  }

  /**
   * Initializes extension in this method
   * Must return a result from "api.preInitialize()"
   * @return {Promise<TApiConfig|null>} API DataSource preInitialize result
   */
  async initialize(): Promise<TApiConfig | null> {
    if (this.api) {
      this.apiConfig = await this.api.preInitialize<TApiConfig>();
    }

    return this.apiConfig;
  }

  /**
   * GraphQL configuration getter
   * @return {object} GraphQL configuration object
   */
  async getGraphQLConfig(): Promise<object> {
    return {};
  }

  /**
   * Should be implemented if extension wants to deliver content for dynamic urls. It should return priority value for passed url.
   * @param {string} url - url for which the priority should be returned
   * @return {number|null} Priority index or null (if "dynamic URL" is not supported)
   */
  getFetchUrlPriority(url: string): number | null {
    return this.api && this.api.getFetchUrlPriority ? this.api.getFetchUrlPriority(url) : ApiUrlPriority.OFF;
  }

  async fetchUrl?(obj: object, args: any, context: any, info: GraphQLResolveInfo): Promise<FetchUrlResult>;
}
