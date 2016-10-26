const type = process.argv[2]
const second = process.argv[3]
const third = process.argv[4]
const opts = process.argv.slice(4).filter(a => a.startsWith('-'))
const semis = opts.includes('-s') ? 's' : ''
const { mkdirSync, writeFile } = require('fs')
const idxComponent = require(`./idxComponent${semis}`)
const classComponent = require(`./classComponent${semis}`)
const pureComponent = require(`./pureComponent${semis}`)
const testComponent = require(`./testComponent${semis}`)
const helpMessage = require('./help')
const help = () => console.log(helpMessage)
const upper = a => a.charAt(0).toUpperCase() + a.slice(1)
const spaces = a => opts.includes('-f') ? a.replace(/ {2}/g, '    ') : a
// const semis = a => opts.includes('-s') ? a.replace(/\s/gi, ';') : a // lol

if (!second || !type || (second === 'dir' && !third)) return help()

const comp = second === 'dir' ? third : second
const component = upper(comp)

const makeFile = (fileName, whatToWrite) => (
  writeFile(fileName, spaces(whatToWrite), 'utf8', err => {
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
