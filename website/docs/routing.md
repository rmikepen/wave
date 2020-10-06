---
title: Routing
---

## App routing

Your Q app gets hosted at the route you passed to `listen()`.

```py {6}
from h2o_q import Q, listen, ui

async def serve(q: Q):
    pass

listen('/foo', serve)
```

To host your app at `localhost:55555/foo` or `www.example.com/foo`, pass `/foo` to `listen()`.

To host your app at `localhost:55555` or `www.example.com`, pass `/` to `listen()`. Do this if you plan to host exactly one app and nothing else.

You can host multiple apps behind a single Q server.

:::caution
`/foo` and `/foo/bar` are two distinct paths. `/foo/bar` is not interpreted as a sub-path of `/foo`.
:::

## Hash routing

Q apps support *hash routing*, a popular client-side mechanism where the location hash (the `baz/qux` in `/foo/bar#baz/qux`) can be used to decide which part of the UI to display.

### Setting the location hash

To set the location hash, prefix `#` to the `name` attribute of command-like components. When the command is invoked, the location hash is set to the name of the command.

For example, if a button is named `foo` is clicked, `q.args.foo` is set to `True`. Instead, if a button named `#foo` is clicked, the location hash is set to `foo` (`q.args.foo` is not set).

The components that support setting a location hash are:
- `ui.button()`
- `ui.command()`
- `ui.nav_item()`
- `ui.tab()`
- `ui.breadcrumb()`

### Getting the location hash

To get the location hash, read `q.args['#']` (a string). If the route in the browser's address bar is `/foo/bar#baz/qux`, `q.args['#']` is set to `baz/qux`.
