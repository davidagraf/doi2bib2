import React, { Component } from 'react';
import Bib from '../utils/Bib.js';
import logo from './doi2bib-logo.png';

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
          this.setState({
            bib: bib.toPrettyString(),
            url: bib.getURL()
          });
        });
    } else {
      console.log("input is wrong");
    }
  }

  render() {
    return (
      <div>
        <div className="row margin-top">
          <div className="col-md-offset-4 col-md-4 text-center">
            <img src={logo} alt="doi2bib_logo" height="60" width="60" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-3 col-md-6 text-center">
            <h2>doi2bib &#8212; give us a DOI and we will do our best to get you the BibTeX entry</h2>
          </div>
        </div>
        <div className="row margin-top">
          <div className="col-md-offset-3 col-md-6">
            <form name="bibForm">
              <div className="input-group">
                <input type="text"
                      className="form-control"
                      maxLength="60"
                      onChange={this.handleChange}
                      placeholder="Enter a doi, PMCID, or arXiv ID"
                      autoFocus/>
                <span className="input-group-btn">
                  <button ytpe="button" className="btn btn-default" onClick={this.handleSubmit}>get BibTeX</button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="row margin-top">
          <div className="col-md-offset-2 col-md-8 text-center">
            <span className="glyphicon glyphicon-refresh spin"></span>
            { this.state.bib && <pre className="text-left">{this.state.bib}</pre> }
            { this.state.url && <a href={this.state.url} target="_blank">{this.stateurl}</a> }
          </div>
        </div>
      </div>
    );
  }
}

export default About;
