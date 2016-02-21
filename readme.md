# Lutils `lutils`
A few reliable utils.

```js
import { typeOf, merge, clone } from 'lutils'
const { typeOf, merge, clone } = require('lutils')

const typeOf = require('lutils-typeof')
const merge  = require('lutils-merge')
const clone  = require('lutils-clone')
```

## API
### `merge`
Recursively merge objects.
See [lutils-merge](/nfour/lutils-merge/)

### `clone`
Recursively clone objects.
See [lutils-clone](/nfour/lutils-clone/)

### `typeOf`
Type check for primitives reliably.
See [lutils-typeof](/nfour/lutils-typeof/)


## Why?
Javascript doesn't need a lot on top of it now that we have ES6/ES7.
Some things are still too hard to do, which is exactly what these utils try to fix.
