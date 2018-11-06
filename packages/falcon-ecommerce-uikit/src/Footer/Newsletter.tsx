import React from 'react';
import { H3, Text, Group, Input, Button, Checkbox, Label, Box, DefaultThemeProps } from '@deity/falcon-ui';

const newsletterLayoutTheme: DefaultThemeProps = {
  newsletterLayout: {
    bgFullWidth: 'secondaryLight',
    py: 'md',
    gridGap: 'sm',
    display: 'grid',
    gridTemplateColumns: '1fr',
    css: {
      maxWidth: 560,
      margin: '0 auto',
      textAlign: 'center'
    }
  }
};

export const Newsletter = () => (
  <Box defaultTheme={newsletterLayoutTheme}>
    <H3>Newsletter</H3>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas nisl eu accumsan sodales. Nam semper
      magna vitae enim placerat dictum.
    </Text>

    <form>
      <Group>
        <Input
          type="email"
          required
          css={({ theme }) => ({
            height: theme.spacing.lg
          })}
        />
        <Button as="input" type="submit" value="Subscribe" />
      </Group>
      <Label htmlFor="subscribe" my="sm" display="flex" justifyContent="center" alignItems="center">
        <Checkbox id="subscribe" required mr="xs" />I would like to subscribe to updates
      </Label>
    </form>
  </Box>
);
