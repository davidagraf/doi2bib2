import React, { Component } from 'react';
import Bibparser from 'jison-loader!../utils/bibparser.jison';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    console.log(Bibparser);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>doi2bib</button>
      </div>
    );
  }
}

export default About;
