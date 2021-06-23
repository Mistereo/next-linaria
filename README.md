# Next.js + Linaria

Adds [Linaria](https://github.com/callstack/linaria) to [built-in CSS support](https://nextjs.org/docs/basic-features/built-in-css-support) in Next.js.

This module is intended to be used with Next.js built-in CSS support (https://nextjs.org/docs/basic-features/built-in-css-support) and probably will not work with custom CSS handling.

Version 0.11 of this package requires Next.js 9.5.4 or above.

For Next.js 9.2-9.5.3 use 0.10.

## Installation

```
npm install --save next-linaria linaria
```

or

```
yarn add next-linaria linaria
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withLinaria = require('next-linaria');
module.exports = withLinaria({
  /* config options here */
});
```

### Linaria options

```js
// next.config.js
const withLinaria = require('next-linaria');
module.exports = withLinaria({
  linaria: {
    /* linaria options here */
  },
});
```

### Configuring Next.js

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withLinaria = require('next-linaria');
module.exports = withLinaria({
  webpack(config, options) {
    return config;
  },
});
```

## License

The MIT License (MIT)
