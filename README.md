# RCG

React Component Generator.

Installation: `npm i -g rcg`

Usage: `rcg`

```
  RCG : React Component Generator
  Please pass component type and name
  Type can be one of: function class test dir
  If dir, please also pass function or class
  Examples:
  rcg function Foo
  rcg dir class bar
```

Assumes the following about what it generates:

* You're using at least ES2015
* Standard style (no semicolons, two spaces)
* Jest + Enzyme with Sinon test

License: WTFPL
