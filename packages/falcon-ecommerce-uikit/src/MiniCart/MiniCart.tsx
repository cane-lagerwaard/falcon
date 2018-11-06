import React from 'react';
import {
  Sidebar,
  Backdrop,
  Portal,
  Icon,
  List,
  ListItem,
  Box,
  H3,
  H4,
  DefaultThemeProps,
  Image,
  Link,
  Text,
  Divider,
  Button,
  NumberInput
} from '@deity/falcon-ui';
import { MiniCartData } from './MiniCartQuery';
import { RemoveCartItemMutation, UpdateCartItemMutation } from '../Cart/CartMutation';
import { ToggleMiniCartMutation } from './MiniCartMutation';
import { SidebarLayout } from '../SidebarLayout';
import { toGridTemplate } from '../helpers';
import { Price } from '../Locale';

export enum MiniCartProductArea {
  empty = '.',
  thumb = 'thumb',
  price = 'price',
  productName = 'productName',
  modify = 'modify',
  remove = 'remove'
}

const miniCartProductTheme: DefaultThemeProps = {
  miniCartProduct: {
    display: 'grid',
    gridGap: 'xs',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['30px',                     '1fr',                     '2fr'                                     ],
      [MiniCartProductArea.empty,  MiniCartProductArea.thumb, MiniCartProductArea.productName           ],
      [MiniCartProductArea.remove, MiniCartProductArea.thumb, MiniCartProductArea.price,          '1fr' ],
      [MiniCartProductArea.empty,  MiniCartProductArea.thumb, MiniCartProductArea.modify                ]
    ])
  }
};

const MiniCartProduct: React.SFC<any> = ({ product, currency }) => (
  <Box defaultTheme={miniCartProductTheme}>
    <Image gridArea={MiniCartProductArea.thumb} src={product.thumbnailUrl} />
    <H4 gridArea={MiniCartProductArea.productName}>{product.name}</H4>
    <Price
      fontSize="md"
      fontWeight="bold"
      gridArea={MiniCartProductArea.price}
      currency={currency}
      value={product.price}
    />
    <RemoveCartItemMutation>
      {removeCartItem => (
        <Link
          gridArea={MiniCartProductArea.remove}
          display="flex"
          alignItems="center"
          onClick={() => removeCartItem({ variables: { input: { itemId: product.itemId } } })}
        >
          <Icon
            size="lg"
            stroke="secondaryDark"
            src="remove"
            mr="xs"
            css={({ theme }) => ({
              ':hover': { stroke: theme.colors.primary }
            })}
          />
        </Link>
      )}
    </RemoveCartItemMutation>
    <UpdateCartItemMutation>
      {(updateCartItem, { loading, error }) => (
        <Box gridArea={MiniCartProductArea.modify}>
          <NumberInput
            disabled={loading}
            min="1"
            name="qty"
            defaultValue={String(product.qty)}
            onChange={ev =>
              updateCartItem({
                variables: {
                  input: {
                    itemId: product.itemId,
                    sku: product.sku,
                    qty: parseInt(ev.target.value, 10)
                  }
                }
              })
            }
          />
          {!!error && <Text color="error">{error.message}</Text>}
        </Box>
      )}
    </UpdateCartItemMutation>
  </Box>
);

const MiniCartProducts: React.SFC<any> = ({ products, currency }) => (
  <List>
    {products.map((product: any, index: number) => (
      <ListItem pb="none" key={product.sku}>
        <MiniCartProduct product={product} currency={currency} />
        {index < products.length - 1 && <Divider my="md" />}
      </ListItem>
    ))}
  </List>
);

export const MiniCart: React.SFC<MiniCartData> = ({ miniCart: { open }, cart: { quoteCurrency, items } }) => (
  <ToggleMiniCartMutation>
    {toggle => (
      <React.Fragment>
        <Sidebar as={Portal} visible={open} side="right">
          <SidebarLayout>
            <Icon src="close" onClick={() => toggle()} position="absolute" top={15} right={30} />
            <H3 mb="lg">Shopping cart</H3>
            <MiniCartProducts products={items} currency={quoteCurrency} />
            <Box position="absolute" bottom={0} right={0} left={0} bg="secondaryLight" p="sm">
              <Button css={{ width: '100%' }}>Checkout</Button>
            </Box>
          </SidebarLayout>
        </Sidebar>
        <Backdrop as={Portal} visible={open} onClick={() => toggle()} />
      </React.Fragment>
    )}
  </ToggleMiniCartMutation>
);
