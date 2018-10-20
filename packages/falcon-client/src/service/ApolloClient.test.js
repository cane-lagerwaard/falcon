import { expandValue } from './ApolloClient';

describe('ApolloClient', () => {
  describe('expandValue', () => {
    it('Should correctly expand nested object', () => {
      const testStateObj = {
        root: {
          foo: {
            generated: true,
            id: 'foo'
          }
        },
        foo: {
          bar: true
        }
      };
      expect(expandValue(testStateObj, 'root')).toEqual({
        foo: {
          bar: true
        }
      });
    });

    it('Should correctly process Array value', () => {
      const testStateObj = {
        root: {
          foo: {
            generated: true,
            id: 'foo'
          }
        },
        foo: {
          list: {
            json: [1, 2],
            type: 'json'
          }
        }
      };
      expect(expandValue(testStateObj, 'root')).toEqual({
        foo: {
          list: [1, 2]
        }
      });
    });

    it('Should handle simple value', () => {
      const testStateObj = {
        root: {
          foo: false
        }
      };
      expect(expandValue(testStateObj, 'root')).toEqual({
        foo: false
      });
    });

    it('Should handle unset value', () => {
      expect(expandValue({}, '')).toEqual({});
    });
  });
});
