#!/usr/bin/env node

const type = process.argv[2]
const second = process.argv[3]
const third = process.argv[4]
const { mkdirSync, writeFile } = require('fs')

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

const pureComponent = `
import React, { PropTypes } from 'react'

const ${component} = () => (
  <div>${component}</div>
)

${component}.propTypes = {

}

export default ${component}
`

const classComponent = `
import React, { Component, PropTypes } from 'react'

export default class ${component} extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>${component}</div>
    )
  }
}
`

const testComponent = `
import React from 'react'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import ${component} from './${component}'

describe('<${component} />', () => {
  const noop = () => {}

  it('looks like a ${component}', () => {
    const ${component.toLowerCase()} = shallow(<${component} />)

    expect(true).toBe(true)
  })
})
`

const idxComponent = `export { default } from './${component}'`

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
  writeFile(`${component}/index.js`, idxComponent, 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${component}/${component}.js`, kind, 'utf8', err => {
    if (err) console.log(err)
  })
  writeFile(`${component}/${component}.test.js`, testComponent, 'utf8', err => {
    if (err) console.log(err)
  })
}

switch (type) {
  case 'function':
    writeComponent(pureComponent)
    break
  case 'class':
    writeComponent(classComponent)
    break
  case 'test':
    writeComponent(testComponent)
    break
  case 'dir':
    writeDir(comp)
    break
  default:
    return help()
}
