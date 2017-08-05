# RCG

React Component Generator.

Installation: `npm i -g rcg`

Usage: `rcg`

```
  RCG : React Component Generator
  -------------------------------
  Please pass component type and name
  Type can be one of: function class test dir
  If dir, please also pass function or class
  Usage:
    rcg type|dir [type] name [options]
  Options:
    -s       | Use semicolons
    -f       | Use four spaces
  Examples:
    rcg function Foo
    rcg dir class bar
    rcg test quux -s
```

By default, RCG assumes:

* You're using at least ES2015
* Standard style (no semicolons, two spaces)
* Jest + React Test Renderer + snapshots + Sinon

License: WTFPL
