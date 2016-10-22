const type = process.argv[2]
const second = process.argv[3]
const third = process.argv[4]
const { mkdirSync, writeFile } = require('fs')
const idxComponent = require('./idxComponent')
const classComponent = require('./classComponent')
const pureComponent = require('./pureComponent')
const testComponent = require('./testComponent')
const helpMessage = require('./help')
const help = () => console.log(helpMessage)

if (!second || !type || (second === 'dir' && !third)) return help()

const comp = second === 'dir' ? third : second

const component = comp.charAt(0).toUpperCase() + comp.slice(1)

const writeComponent = kind => {
  const fileName = type === 'test'
    ? `${component}.test.js`
    : `${component}.js`
  writeFile(fileName, kind.substr(1), 'utf8', err => {
    if (err) console.log(err)
  })
}

const makeDir = comp => mkdirSync(comp)

const writeDir = (kind, name) => {
  const toWrite = kind === 'function' ? pureComponent(name) : classComponent(name)
  makeDir(name)
  writeFile(`${name}/index.js`, idxComponent(name), 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${name}/${component}.js`, toWrite, 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${name}/${name}.test.js`, testComponent(name), 'utf8', err => {
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
    writeDir(second, third)
    break
  default:
    return help()
}
