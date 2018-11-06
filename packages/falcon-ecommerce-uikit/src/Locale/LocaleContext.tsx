import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// todo: this is temporary, these values should be fetched from shop settings
// todo: this probably should be exposed as LocaleProvider's prop so it can be passed from outside
const GET_LOCALE_SETTINGS = gql`
  query LocaleSettings {
    localeSettings @client {
      locale
      currency
    }
  }
`;

type LocaleContextType = {
  locale: string;
  currency: string;
};

export const LocaleContext = React.createContext<LocaleContextType>({
  locale: 'en',
  currency: 'EUR'
});

export const LocaleProvider: React.SFC<any> = ({ children }) => (
  <Query query={GET_LOCALE_SETTINGS}>
    {({ data }) => <LocaleContext.Provider value={data.localeSettings}>{children}</LocaleContext.Provider>}
  </Query>
);
