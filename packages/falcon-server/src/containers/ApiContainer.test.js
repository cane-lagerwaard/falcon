const { EventEmitter2 } = require('eventemitter2');
const ApiContainer = require('./ApiContainer');

const apis = {
  'fake-api': {
    package: 'fake-backend-api'
  }
};

describe('ApiContainer', () => {
  let ee;

  beforeEach(() => {
    ee = new EventEmitter2();
  });

  it('Should register provided API DataSources', async () => {
    /** @type {ApiContainer} */
    const container = new ApiContainer(ee);
    await container.registerApis(apis);
    expect(container.dataSources.size).toBe(1);
    expect(container.endpoints).toHaveLength(1);

    const apiInstance = container.dataSources.get('fake-api');
    expect(apiInstance).toBeTruthy();
    expect(apiInstance.name).toBe('fake-api');

    const endpoint = container.endpoints[0];
    expect(endpoint.path).toBe('/info');
  });

  it('Should do nothing for an empty API list', async () => {
    const container = new ApiContainer(ee);
    await container.registerApis();
    expect(container.dataSources.size).toBe(0);
    expect(container.endpoints).toHaveLength(0);
  });

  it('Should not fail for missing API DataSource package', async () => {
    const container = new ApiContainer(ee);
    await container.registerApis([{ package: 'foo-bar' }]);

    expect(container.dataSources.size).toBe(0);
  });
});
