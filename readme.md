# envstachify

Evaluate files as [mustache][mustache] templates at build time, by default
using `process.env` as the context. This is a lot like [envify][envify], but
uses mustache-style syntax instead of `process.env.VAR`. This is NOT a mustache
template compiler transform.

## install

```bash
npm install --save-dev browserify envstachify
```

## when and how to use

`envstachify` will replace `{{ SOME_ENV }}` or `{{{ SOME_ENV }}}` with the value
of the `SOME_ENV` environment variable at build time. It's the same as
[envify][envify], but it works on non-Javascript files.

If have some HTML for a template file that will be `require()`'d and needs to
reference a URL that is only known at build time, `envstachify` has you
covered. Here's a simple example using [html-browserify][html] to require html
as a string:

```js
// foo.js
var template = require('./templates/foo.html')
```

```html
<!-- templates/foo.html -->
<img src="{{{ RELEASE_URL }}}/images/cat.jpg">
```

```bash
RELEASE_URL=http://example.com/builds/123 browserify -t html-browserify -t envstachify foo.js
```

`foo.html` will contain an image with `src=http://example.com/builds/123/images/cat.jpg`.

  [mustache]: https://github.com/janl/mustache.js/
  [envify]: https://github.com/hughsk/envify
  [html]: https://www.npmjs.com/package/html-browserify
