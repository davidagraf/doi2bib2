import React, { Component } from 'react';
import Bib from '../utils/Bib.js';
import logo from './doi2bib-logo.png';

function getDomain() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001';
  } else {
    return '';
  }
}

class Doi2Bib extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: decodeURIComponent(props.match.params.query || '')
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.value) {
      this.generateBib(false);
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.generateBib(true);
  }

  generateBib(changeBrowserURL) {
    let idToSend = this.state.value;
    let url;

    this.setState({
      bib: null,
      url: null,
      error: null,
      workInProgress: true
    });

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
      fetch(getDomain() + url + '?id=' + idToSend)
        .then(response => {
          if (!response.ok) {
            return response.text().then(Promise.reject.bind(Promise));
          } else {
            return response.text();
          }
        })
        .then(data => {
          let bib = new Bib(data);
          this.setState({
            bib: bib.toPrettyString(),
            url: bib.getURL(),
            workInProgress: false
          });
          if (changeBrowserURL) {
            this.props.history.push('/bib/' + encodeURIComponent(this.state.value));
          }
        }, data => {
          this.setState({
            error: data,
            workInProgress: false
          });
        });
    } else {
      this.setState({
        error: 'Invalid ID. Must be DOI, PMID, or arXiv ID (after 2007).',
        workInProgress: false
      });
    }
  }

  render() {
    return (
      <div className="text-center">
        <div className="row">
          <div className="col">
            <img src={logo} alt="doi2bib_logo" height="60" width="60" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>doi2bib &#8212; give us a DOI and we will do our best to get you the BibTeX entry</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form name="bibForm">
              <div className="input-group">
                <input type="text"
                      className="form-control"
                      maxLength="60"
                      onChange={this.handleChange}
                      value={this.state.value}
                      placeholder="Enter a doi, PMCID, or arXiv ID"
                      autoFocus/>
                <span className="input-group-btn">
                  <button ytpe="button" className="btn btn-default" onClick={this.handleSubmit}>get BibTeX</button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            { this.state.workInProgress && <i className="fa fa-refresh fa-spin"></i> }
            { this.state.bib && <pre className="text-left">{this.state.bib}</pre> }
            { this.state.url && <a href={this.state.url} target="_blank">{this.state.url}</a> }
            { this.state.error && <pre className="text-danger text-left">{this.state.error}</pre> }
          </div>
        </div>
      </div>
    );
  }
}

export default Doi2Bib;
