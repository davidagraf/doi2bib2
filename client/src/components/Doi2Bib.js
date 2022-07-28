import React, { Component } from 'react';
import Bib from '../utils/Bib.js';
import logo from './doi2bib-logo.png';

import Code from './Code.js';

function getDomain() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001';
  } else {
    return '';
  }
}

const BIB = '/bib/';

class Doi2Bib extends Component {
  constructor(props) {
    super(props);
    let doiInUrl = '';
    if (props.location.pathname.startsWith(BIB)) {
      doiInUrl = props.location.pathname.substring(BIB.length);
    }
    this.state = {
      value: doiInUrl
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.copyBibToClipboard = this.copyBibToClipboard.bind(this);
    this.copyUrlToClipboard = this.copyUrlToClipboard.bind(this);
  }

  componentDidMount() {
    if (this.state.value) {
      this.generateBib(false);
    }
    window.scrollTo(0, 0);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.generateBib(true);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.generateBib(true);
  }

  copyToCipboard(event, text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    event.target.focus();
  }

  copyBibToClipboard(event) {
    this.copyToCipboard(event, this.state.bib);
  }

  copyUrlToClipboard(event) {
    this.copyToCipboard(event, this.state.url);
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

    if (idToSend.match(/^(doi:|(https?:\/\/)?(dx\.)?doi\.org\/)?10\..+\/.+$/i)) {
      if (idToSend.match(/^doi:/i)) {
        idToSend = idToSend.substring(4);
      } else if (idToSend.indexOf('doi.org/') >= 0) {
				idToSend = idToSend.substr(idToSend.indexOf('doi.org/') + 8)
			}

      url = '/8350e5a3e24c153df2275c9f80692773/doi2bib';
    } else if (idToSend.match(/^\d+$|^PMC\d+(\.\d+)?$/)) {
      url = '/8350e5a3e24c153df2275c9f80692773/pmid2bib';
    }
    else if (idToSend.match(/^(arxiv:)?\d+\.\d+(v(\d+))?/i)) {
      if (idToSend.match(/^arxiv:/i)) {
        idToSend = idToSend.substring(6);
      }
      url = '/8350e5a3e24c153df2275c9f80692773/arxivid2bib';
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
            this.props.history.push('/bib/' + this.state.value);
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
        <div className="row margin-top">
          <div className="col">
            <img src={logo} alt="doi2bib_logo" height="60" width="60" />
          </div>
        </div>
        <div className="row margin-top">
          <div className="offset-md-2 col-md-8">
            <h2>doi2bib &#8212; give us a DOI<br/>and we will do our best to get you the BibTeX entry</h2>
          </div>
        </div>
        <div className="row margin-top">
          <div className="offset-md-2 col-md-8">
            <form name="bibForm">
              <div className="input-group">
                <input type="text"
                      className={'form-control' + (this.state.error ? ' is-invalid' : '')}
                      maxLength="100"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      value={this.state.value}
                      placeholder="Enter a doi, PMCID, or arXiv ID"
                      autoFocus/>
                <span className="input-group-btn">
                  <button type="button" className="btn btn-light" onClick={this.handleSubmit}>get BibTeX</button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="row margin-top">
          <div className="offset-md-2 col-md-8">
            { this.state.workInProgress && <i className="fa fa-refresh fa-spin"></i> }
            { this.state.bib && <Code ref={(el) => this.bibArea = el}>{this.state.bib}</Code> }
            { this.state.url && <a href={this.state.url} target="_blank" ref={(el) => this.urlArea = el}>{this.state.url}</a> }
            { this.state.error && <pre className="text-danger text-left">{this.state.error}</pre> }
          </div>
        </div>
        {
          this.state.bib && this.state.url &&
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <button className="copy-button btn btn-light" onClick={this.copyBibToClipboard}>Copy Bib to Clipboard</button>
              <button className="copy-button btn btn-light" onClick={this.copyUrlToClipboard}>Copy URL to Clipboard</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Doi2Bib;
