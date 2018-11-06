import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      itemId
      sku
      qty
      name
      price
      productType
    }
  }
`;

export class AddToCartMutation extends Mutation {
  static defaultProps = {
    mutation: ADD_TO_CART,
    refetchQueries: ['MiniCart', 'Cart']
  };
}

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($input: RemoveCartItemInput!) {
    removeCartItem(input: $input)
  }
`;

export class RemoveCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: REMOVE_CART_ITEM,
    refetchQueries: ['MiniCart', 'Cart']
  };
}

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      itemId
    }
  }
`;

export class UpdateCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: UPDATE_CART_ITEM,
    refetchQueries: ['MiniCart', 'Cart']
  };
}
