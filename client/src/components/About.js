import React, { Component } from 'react';
import Donate from './Donate';
import queryString from 'query-string';

class About extends Component {
  doScroll() {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.donate) {
      this.donate.scrollIntoView(true);
    } else {
      window.scrollTo(0,0);
    }
  }

  componentDidMount(props) {
    this.doScroll();
  }

  componentDidUpdate(prevProps, prevState) {
    this.doScroll();
  }

  render() {
    return (
      <div className="margin-top">
      <h1>About</h1>
      <p>How can I retrieve BibTeX entries? This question is being asked over and over again. We decided to address this question and implement a simple web interface that, when entered a digital object identifier (DOI), returns the BibTeX entry. We hope to simplify the citation process through this service in the best interest of research.</p>

      <p>Using our service, you will get the best possible result. We retrieve citation records directly from publishers through public interfaces provided by <a href="https://www.doi.org">The International DOI Foundation</a> and <a href="https://crossref.org">Crossref</a>. Nevertheless, BibTeX entries might contain errors, so we strongly recommend to always check them for completeness and correctness.</p>

      <p>It makes us happy to see that people use our service for their research/work. You can make us even happier when you <a href="https://twitter.com/doi2bib">tweet about us (@doi2bib)</a> or tell the world about <a href="">doi2bib</a> in any other possible way.</p>

      <p>We will do our best to keep this service free of charge and free of ads.</p>


      <h2>Getting in touch</h2>
      <p>Would you like to report a bug, propose a feature, or just share your thoughts? Please get in touch through <a href="https://twitter.com/doi2bib">@doi2bib</a>.</p>

      <h2>Contributions</h2>
      <p>The code for this site is open source, hosted on <a href="https://github.com/davidagraf/doi2bib2/">GitHub</a>. Some of the ideas were taken from a script written by <a href="http://coudert.name/">FX Coudert</a>, available on <a href="https://github.com/fxcoudert/tools">GitHub</a>.</p>

      <h2 name="donate" ref={(donate) => { this.donate = donate; }}>Donate</h2>
      <p>We very much appreciate your support.</p>
      <Donate/>
      </div>
    );
  }
}

export default About;
