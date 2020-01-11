module.exports = comp => `
import React from 'react';
import { create } from 'react-test-renderer';
import { spy } from 'sinon';
import ${comp} from './${comp}';

describe('<${comp} />', () => {
  const noop = () => {};

  it('renders correctly', () => {
    const ${comp.toLowerCase()} = create(<${comp} />).toJSON();
    expect(${comp.toLowerCase()}).toMatchSnapshot();
  });
});
`.substr(1)
