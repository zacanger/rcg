module.exports = comp => `
import React from 'react'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import ${comp} from './${comp}'

describe('<${comp} />', () => {
  const noop = () => {}

  it('looks like a ${comp}', () => {
    const ${comp.toLowerCase()} = shallow(<${comp} />)

    expect(true).toBe(true)
  })
})
`

