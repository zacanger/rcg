module.exports = `
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
`
