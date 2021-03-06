import { themed } from '@deity/falcon-ui';

export const AppLayout = themed({
  tag: 'div',

  defaultTheme: {
    appLayout: {
      px: {
        xs: 'xs',
        md: 'sm'
      },
      css: {
        margin: '0 auto',
        maxWidth: 1480
      }
    }
  }
});
