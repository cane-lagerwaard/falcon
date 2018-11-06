import React from 'react';
import { Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem, Box } from '@deity/falcon-ui';
import { LanguageItem } from './FooterQuery';

type LanguageSwitcherProps = {
  languages: LanguageItem[];
  onChange?: any;
};

export const LanguageSwitcher: React.SFC<LanguageSwitcherProps> = ({ languages, onChange }) => {
  const activeLanguage = languages.filter(lang => lang.active)[0];

  return (
    <Dropdown onChange={onChange}>
      <DropdownLabel css={{ textAlign: 'left' }}>{activeLanguage.name}</DropdownLabel>

      <DropdownMenu>
        {languages.map(lang => (
          <DropdownMenuItem key={lang.code} value={lang}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
