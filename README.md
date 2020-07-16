# Email Signature Generator

> Generate email signatures using MJML & mustache


## References

- [MJML](https://mjml.io)
- [Mustache](https://github.com/janl/mustache.js/)

## Development

- Install dependencies (**must be Yarn**) `yarn`
- Launch live-reload dev server > `yarn dev`
- Or Manually compile > `yarn build`

## Overview

- `signature.mustache.mjml` is the main signature template that uses a modified fork of MJML & Mustache templating
- This gets compiled into `dist/compiled.html` upon building
- `dist/index.html` is the generator form which pulls in that compiled html and is rendered with Mustache
