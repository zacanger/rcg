module.exports = comp => `
import React, { Component, PropTypes } from 'react'

export default class ${comp} extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>${comp}</div>
    )
  }
}
`
