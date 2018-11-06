import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_CART = gql`
  query Cart {
    cart {
      itemsQty
      quoteCurrency
      items {
        itemId
        sku
        qty
        name
        price
        thumbnailUrl
      }
    }
  }
`;

export type CartData = {
  cart: {
    itemsQty: number;
    quoteCurrency: string;
    items: any[];
  };
};

export class CartQuery extends Query<CartData> {
  static defaultProps = {
    query: GET_CART
  };
}
