const type = process.argv[2]
const second = process.argv[3]
const third = process.argv[4]
const { mkdirSync, writeFile } = require('fs')
const idxComponent = require('./idxComponent')
const classComponent = require('./classComponent')
const pureComponent = require('./pureComponent')
const testComponent = require('./testComponent')

const help = () =>
  console.log(`
  please pass component type and component name
  component type can be one of class, function, test, or dir
  if the option is dir, please also pass function or class
  examples:
  rcg function Foo
  rcg dir class bar
`)

if (!second || !type) return help()
let comp = second
if (second === 'dir') {
  if (!third) return help()
  comp = third
}

const component = comp.charAt(0).toUpperCase() + comp.slice(1)

const writeComponent = kind => {
  const fileName = type === 'test'
    ? `${component}.test.js`
    : `${component}.js`
  writeFile(fileName, kind.substr(1), 'utf8', err => {
    if (err) console.log(err)
  })
}

const writeDir = kind => {
  mkdirSync(component)
  writeFile(`${component}/index.js`, idxComponent(component), 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${component}/${component}.js`, kind, 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${component}/${component}.test.js`, testComponent(component), 'utf8', err => {
    if (err) console.log(err)
  })
}

switch (type) {
  case 'function':
    writeComponent(pureComponent(component))
    break
  case 'class':
    writeComponent(classComponent(component))
    break
  case 'test':
    writeComponent(testComponent(component))
    break
  case 'dir':
    writeDir(comp)
    break
  default:
    return help()
}
