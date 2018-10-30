---
name: Details
menu: Components
---

# Details

import { Playground } from 'docz'; import { State, Toggle } from 'react-powerplug'; import { Details, Summary, DetailsContent, Box } from '../';

## Details

### Example usage as accordion

 {\({ setState, state }\) =&gt; \( {state.items.map\(\(item, index\) =&gt; \( { e.preventDefault\(\); setState\(state =&gt; \({ activeIndex: state.activeIndex === index ? -1 : index }\)\); }} &gt; {item.title}{item.description} \)\)} \)}

### Example usage with multiple items that opened at once

 {\({ state }\) =&gt; \( {state.items.map\(\(item, index\) =&gt; \( {\({ on, toggle }\) =&gt; \( { e.preventDefault\(\); toggle\(\);}}&gt; {item.title}{item.description} \)} \)\)} \)}

