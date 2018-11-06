import XIcon from 'react-feather/dist/icons/x';
import Circle from 'react-feather/dist/icons/heart';
import CustomIcon from 'react-feather/dist/icons/airplay';
import ArrowUp from 'react-feather/dist/icons/arrow-up';
import ArrowDown from 'react-feather/dist/icons/arrow-down';
import { Theme, themed } from '../src';

export const themeWithCustomBreadcrumbSeparator = (theme: Theme) => ({
  ...theme,
  ...{
    components: {
      breadcrumb: {
        css: {
          ':after': {
            content: '"/"'
          }
        }
      }
    }
  }
});

export const themeWithCustomCheckmark = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      checkboxCheckmarkIcon: {
        icon: XIcon,
        fill: 'white'
      }
    }
  }
});

export const themeWithCustomRadioCheck = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      radioCheckedIcon: {
        icon: Circle
      }
    }
  }
});

export const themeWithCustomIcon = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      customIcon: {
        icon: CustomIcon
      }
    }
  }
});

export const themeWithCustomNumberIcons = (theme: Theme) => ({
  ...theme,
  ...{
    icons: {
      numberInputDown: {
        icon: ArrowDown
      },
      numberInputUp: {
        icon: ArrowUp
      }
    }
  }
});

export const customizedTheme = (theme: Theme) => ({
  ...theme,
  ...{
    colors: {
      primary: '#A9CF38'
    },
    fonts: {
      sans: '"Comic Sans MS", "Comic Sans", cursive'
    }
  }
});

export const customizedButtonTheme = (theme: Theme) => ({
  ...theme,
  ...{
    components: {
      button: {
        height: 'xl',
        px: 'lg',
        bg: 'transparent',
        color: 'secondaryText',
        fontWeight: 'bold',
        border: 'bold',
        borderColor: 'primary',
        borderRadius: 'round'
      }
    }
  }
});

export const Card = themed({
  tag: 'div',
  defaultTheme: {
    card: {
      p: 'md',
      boxShadow: 'subtle',
      borderRadius: 'medium',
      bg: 'white',
      fontSize: 'lg',
      css: {
        textAlign: 'center'
      }
    }
  }
});
