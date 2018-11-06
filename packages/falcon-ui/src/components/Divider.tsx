import { themed } from '../theme';

export const Divider = themed({
  tag: 'hr',

  defaultTheme: {
    divider: {
      display: 'block',
      m: 'none',
      borderTop: 'regular',
      borderBottom: 'none',
      borderLeft: 'none',
      borderColor: 'secondaryDark',

      css: {
        width: '100%'
      }
    }
  }
});
