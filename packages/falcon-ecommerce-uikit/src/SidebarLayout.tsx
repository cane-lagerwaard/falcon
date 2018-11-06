import { themed } from '@deity/falcon-ui';

export const SidebarLayout = themed({
  tag: 'div',

  defaultTheme: {
    sidebarLayout: {
      px: {
        xs: 'sm',
        md: 'md'
      },
      py: 'sm',
      css: {
        width: {
          xs: '80vw',
          sm: 510
        }
      }
    }
  }
});
