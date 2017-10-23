import React, { Component } from 'react';
import Bib from '../utils/Bib.js';

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
    event.preventDefault();

    let idToSend = this.state.value;
    let url;

    idToSend = idToSend.replace(/ /g, '');

    if (idToSend.match(/^(doi:|(http:\/\/)?(dx\.)?doi\.org\/)?10\..+\/.+$/i)) {
      if (idToSend.match(/^doi:/i)) {
        idToSend = idToSend.substring(4);
      } else if (idToSend.indexOf('doi.org/') > 0) {
				idToSend = idToSend.substr(idToSend.indexOf('doi.org/') + 8)
			}

      url = '/doi2bib';
    } else if (idToSend.match(/^\d+$|^PMC\d+(\.\d+)?$/)) {
      url = '/pmid2bib';
    }
    else if (idToSend.match(/^(arxiv:)?\d+\.\d+(v(\d+))?/i)) {
      if (idToSend.match(/^arxiv:/i)) {
        idToSend = idToSend.substring(6);
      }
      url = '/arxivid2bib';
    }

    if(url) {
      fetch('http://localhost:3001' + url + '?id=' + idToSend)
        .then(response => response.text())
        .then(data => {
          let bib = new Bib(data);
          console.log(bib.toPrettyString());
          console.log(bib.getURL());
          console.log(data);
        });
    } else {
      console.log(url);
    }

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
