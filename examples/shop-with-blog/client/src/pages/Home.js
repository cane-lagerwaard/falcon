import React from 'react';
import { I18n } from 'react-i18next';

import { H1, GridLayout } from '@deity/falcon-ui';
import { ProductsList, ProductsListQuery } from '@deity/falcon-ecommerce-uikit';

const Home = () => (
  <GridLayout gridGap="md" py="md">
    <I18n ns={['shop']}>{t => <H1 css={{ textAlign: 'center' }}>{t('home.hotSellers')}</H1>}</I18n>

    <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery>
  </GridLayout>
);

export default Home;
