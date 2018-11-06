import React from 'react';
import { Value } from 'react-powerplug';

import { themed } from '../theme';
import { Box } from './Box';

export const Navbar = themed({
  tag: 'ul',

  defaultTheme: {
    navbar: {
      p: 'none',
      m: 'none',
      bgFullWidth: 'primary',
      color: 'primaryText',
      css: {
        display: 'flex',
        listStyle: 'none',
        position: 'relative'
      }
    }
  }
});

type NavbarContextType = {
  open?: boolean;
};

const NavbarItemContext = React.createContext<NavbarContextType>({});

const NavbarItemInnerDOM: React.SFC<any> = props => (
  <Value initial={false}>
    {({ set, value }) => (
      <NavbarItemContext.Provider value={{ open: value }}>
        <Box
          as="li"
          {...props}
          onMouseEnter={() => set(true)}
          onMouseLeave={() => set(false)}
          onClick={() => set(false)}
        />
      </NavbarItemContext.Provider>
    )}
  </Value>
);

export const NavbarItem = themed({
  tag: NavbarItemInnerDOM,

  defaultTheme: {
    navbarItem: {
      fontSize: 'sm',
      display: 'flex',
      color: 'primaryText',

      css: ({ theme }) => ({
        cursor: 'pointer',
        userSelect: 'none',
        listStyle: 'none',

        ':hover': {
          background: theme.colors.secondary,
          color: theme.colors.secondaryText
        }
      })
    }
  }
});

const NavbarItemMenuInnerDOM: React.SFC<any> = props => (
  <NavbarItemContext.Consumer>
    {({ open }) => <Box {...props} display={open ? 'block' : 'none'} />}
  </NavbarItemContext.Consumer>
);

export const NavbarItemMenu = themed({
  tag: NavbarItemMenuInnerDOM,

  defaultProps: {
    role: 'menu'
  },

  defaultTheme: {
    navbarItemMenu: {
      p: 'sm',
      bg: 'secondary',
      color: 'secondaryText',
      boxShadow: 'subtle',
      css: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0
      }
    }
  }
});
