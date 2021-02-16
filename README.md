# Next.js + Linaria

Adds [Linaria](https://github.com/callstack/linaria) to [built-in CSS support](https://nextjs.org/docs/basic-features/built-in-css-support) in Next.js.

> The version `1.0.0` and above only works with linaria@3. If you need support for linaria@2, please use version `0.10.0` of this package.

This module is intended to be used with Next.js built-in CSS support (https://nextjs.org/docs/basic-features/built-in-css-support) and probably will not work with custom CSS handling.

Requires Next.js 9.2 or above.

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
