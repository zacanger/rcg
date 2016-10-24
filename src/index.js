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
const upper = a => a.charAt(0).toUpperCase() + a.slice(1)

if (!second || !type || (second === 'dir' && !third)) return help()

const comp = second === 'dir' ? third : second
const component = upper(comp)

const makeFile = (fileName, whatToWrite) => (
  writeFile(fileName, whatToWrite, 'utf8', err => {
    if (err) console.warn('Error writing file:', err)
  })
)

const writeComponent = kind => {
  const fileName = type === 'test'
    ? `${component}.test.js`
    : `${component}.js`
  makeFile(fileName, kind)
}

const writeDir = (kind, name) => {
  const c = upper(name)
  let toWrite
  if (kind === 'function') toWrite = pureComponent(c)
  if (kind === 'class') toWrite = classComponent(c)
  if (kind !== 'function' && kind !== 'class') return help()
  mkdirSync(c)
  makeFile(`${c}/index.js`, idxComponent(c))
  makeFile(`${c}/${c}.js`, toWrite)
  makeFile(`${c}/${c}.test.js`, testComponent(c))
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
