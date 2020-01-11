module.exports = comp => `
import React, { PropTypes } from 'react';

const ${comp} = () => (
  <div>${comp}</div>
);

${comp}.propTypes = {

};

export default ${comp};
`.substr(1)
