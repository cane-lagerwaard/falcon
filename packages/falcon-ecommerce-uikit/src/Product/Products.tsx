import React from 'react';
import { Link } from 'react-router-dom';
import { themed, Image, Text } from '@deity/falcon-ui';
import { Price } from '../Locale';

export const ProductCardLayout = themed({
  tag: Link,
  defaultTheme: {
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'secondaryText',

      css: {
        height: '100%',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer'
      }
    }
  }
});

export const ProductListLayout = themed({
  tag: 'ul',
  defaultTheme: {
    productListLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
      gridAutoRows: '280px',
      gridGap: 'sm',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});

export const ProductsList: React.SFC<{ products: any[] }> = ({ products }) => (
  <ProductListLayout>
    {products.map((product: any) => (
      <li key={product.id}>
        <ProductCardLayout to={product.urlPath}>
          <Image css={{ flex: 1, minHeight: '0%' }} src={product.thumbnail} />

          <Text my="xs" ellipsis>
            {product.name}
          </Text>

          <Price fontSize="md" value={product.price} />
        </ProductCardLayout>
      </li>
    ))}
  </ProductListLayout>
);
