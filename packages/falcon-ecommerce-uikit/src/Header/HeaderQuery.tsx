import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_HEADER_DATA = gql`
  query HeaderData {
    config @client {
      menus {
        header {
          name
          url
          children
        }
        banner {
          name
          url
        }
      }
    }
  }
`;
export type MenuItem = {
  name: string;
  url: string;
  children: MenuItem[];
};
export type HeaderData = {
  config: {
    menus: {
      header: MenuItem[];
      banner: MenuItem[];
    };
  };
};

export class HeaderQuery extends Query<HeaderData> {
  static defaultProps = {
    query: GET_HEADER_DATA
  };
}
