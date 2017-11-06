import React, { Component } from 'react';

class About extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
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

      <h2><a name="donate">Donate</a></h2>
      <p>We very much appreciate your support.</p>
      <div class="center">
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
      " />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
      <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
      </form>
      </div>
      </div>
    );
  }
}

export default About;
