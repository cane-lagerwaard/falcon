global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const nock = require('nock');
const Magento2Api = require('./index');
const magentoResponses = require('./__mocks__/apiResponses');
const { codes } = require('@deity/falcon-errors');

const URL = 'http://example.com';
const apiConfig = {
  config: {
    host: 'example.com',
    protocol: 'http'
  },
  name: 'api-magento2'
};
const createMagentoUrl = path => `/rest/default/V1${path}`;

describe('Magento2Api', () => {
  let api;

  beforeAll(async () => {
    nock(URL)
      .post(createMagentoUrl('/integration/admin/token'))
      .reply(200, magentoResponses.adminToken.data);
    api = new Magento2Api(apiConfig);
    await api.preInitialize();
  });

  afterAll(() => {
    nock.restore();
  });

  it('Should correctly fetch admin token', async () => {
    const result = await api.retrieveAdminToken();
    expect(result).toEqual(magentoResponses.adminToken.data.token);
  });

  it('Should correctly fetch category data', async () => {
    nock(URL)
      .get(uri => /\/categories\/20/.test(uri)) // regexp as query params might be there
      .reply(200, magentoResponses.category.data);

    api.context = { magento2: { storeCode: '' } };
    const result = await api.category({ id: 20 });
    expect(result.data.id).toEqual(magentoResponses.category.data.id);
  });

  it('Should correctly handle request error without token', async () => {
    nock(URL)
      .get(uri => uri.indexOf(createMagentoUrl('/products') > 0))
      .reply(401, {
        message: 'Consumer is not authorized to access %resources',
        parameters: {
          resources: 'Magento_Catalog::categories'
        }
      });

    try {
      await api.products({});
    } catch (error) {
      expect(error.extensions.code).toBe(codes.UNAUTHENTICATED);
      expect(error.message).toBe('Consumer is not authorized to access Magento_Catalog::categories');
      expect(error.extensions.response.status).toBe(401);
    }
  });

  it('Should correctly convert paths returned by Magento2 to urls', () => {
    expect(api.convertPathToUrl('test')).toBe('/test.html');
    // null should not not be converted
    expect(api.convertPathToUrl(null)).toBe(null);
  });
});
