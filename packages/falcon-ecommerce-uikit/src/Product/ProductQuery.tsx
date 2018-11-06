import gql from 'graphql-tag';
import { Query } from '../Query';

export const GET_PRODUCT = gql`
  query Product($id: Int!) {
    product(id: $id) {
      id
      sku
      name
      description
      price
      currency
      gallery {
        full
        thumbnail
      }
      configurableOptions {
        id
        attributeId
        label
        productId
        values {
          valueIndex
          label
          inStock
        }
      }
      seo {
        title
        description
        keywords
      }
      breadcrumbs {
        name
        urlPath
      }
    }
  }
`;

function getTranslations(t: reactI18Next.TranslationFunction /* , product: any */) {
  return {
    sku: t('product.sku'),
    inStock: t('product.inStock'),
    reviews: t('product.reviews', { count: 3 }),
    addToCart: t('product.addToCart'),
    addingToCart: t('product.addingToCart'),
    addedToCart: t('product.addedToCart'),
    error: {
      qty: t('product.error.qty'),
      configurableOptions: t('product.error.configurableOptions')
    },
    tabs: {
      reviews: '...'
    }
  };
}

export type ProductTranslations = ReturnType<typeof getTranslations>;

export class ProductQuery extends Query<any> {
  static defaultProps = {
    query: GET_PRODUCT,
    getTranslations,
    translationsNamespaces: ['shop']
  };
}

export const GET_PRODUCTS = gql`
  query Products {
    products {
      items {
        id
        name
        price
        thumbnail
        urlPath
      }
    }
  }
`;

export type Products = {
  items: any[];
};

export class ProductsListQuery extends Query<Products> {
  static defaultProps = {
    query: GET_PRODUCTS
  };
}
