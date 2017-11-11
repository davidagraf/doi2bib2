import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Code.css';

class Code extends Component {
  render() {
    return (
      <pre className="bibtex-code text-left"><code>{this.props.children}</code></pre>
    );
  }
}

Code.propTypes = {
  children: PropTypes.string.isRequired
};

export default Code;
