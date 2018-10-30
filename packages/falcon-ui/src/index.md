---
name: Get Started
route: /
order: 1
---

# Get Started

## Introduction

**Falcon UI** is a library of composable and themable primitive UI components for React, that helps with building consistent, fast and responsive web apps. It's shipped as a part of **@deity/falcon** starter kit, but can also be installed standalone using instructions below.

## Install

```bash
  yarn add @deity/falcon-ui
  # or npm i @deity/falcon-ui
```

import { Link } from 'docz';

## Usage

Wrap the root of your application with the ThemeProvider component, which adds the theme to context that gets used by **@deity/falcon-ui** components. ThemeProvider component accepts a `theme` prop for setting a custom theme.

Learn more about theming

```javascript
import { ThemeProvider, Button } from '@deity/falcon-ui';

const App = (
  <ThemeProvider>
    <Button>Hello!</Button>
  </ThemeProvider>
);
```

