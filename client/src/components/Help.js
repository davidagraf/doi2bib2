import React, { Component } from 'react';

import Code from './Code.js';

const EXAMPLE1 =
`@article{einstein1905zur,
  title={Zur Elektrodynamik bewegter K\\"orper},
  volume={322},
  ISSN={1521-3889},
  url={http://dx.doi.org/10.1002/andp.19053221004},
  DOI={10.1002/andp.19053221004},
  number={10},
  journal={Annalen der Physik},
  publisher={Wiley-Blackwell},
  author={Einstein, A.},
  year={1905},
  pages={891--921}
}`;

const EXAMPLE2 =
`\\documentclass{article}
\\usepackage[doi=false, url=false, isbn=false, backend=biber]{biblatex}
\\bibliography{references}
\\begin{document}
\\nocite{*}
\\printbibliography
\\end{document}`;

const EXAMPLE3 =
`\\documentclass[11pt]{article}
\\usepackage{natbib}
\\usepackage{url}
\\begin{document}
\\nocite{*}
\\bibliographystyle{natbib}
\\bibliography{references}
\\end{document}`;


const EXAMPLE4 =
`\\documentclass[11pt]{article}
\\usepackage{natbib}
\\begin{document}
\\nocite{*}
\\bibliographystyle{plain}
\\bibliography{references}
\\end{document}</pre>`;

class Help extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div className="margin-top">
      <h2>Doi2bib Help</h2>
      <h3>Getting the DOI and using doi2bib</h3>
      <p>For most publications, the digital object identifier (DOI) is located on the title page or in the header of every page. The identifier always starts with "10.". Copy and paste the DOI into the search field on our <a href="http://doi2bib.org">main site</a> and press &lt;Enter&gt; or the button: <tt>Get BibTeX</tt>. If the identifier entered is a valid DOI, the BibTeX citation will appear below. Select the entire citation, copy it to the clipboard (e.g. by pressing &lt;ctrl-c&gt;) and paste it to your BibTeX reference file (.bib) or favorite BibTeX reference manager. Some of the most common BibTeX managers include: <a href="http://jabref.sourceforge.net/">JabRef (all platforms)</a>, <a href="http://pybliographer.org/">Pybliographer (Linux)</a>, and <a href="http://bibdesk.sourceforge.net/">BibDesk (Mac)</a>.</p>
      <p>Should you have any further questions, get in touch through <a href="https://twitter.com/doi2bib">@doi2bib</a>.</p>

      <br/>
      <h3>BibTeX File (.bib)</h3>
      <p>BibTeX entries are saved to a text file which serves as a bibliographic references database. As an example, consider the file <tt>references.bib</tt> that contains one BibTeX entry:</p>

      <div className="row">
      <div className="col-md-offset-2 col-md-8">

      <Code>{EXAMPLE1}</Code>

      </div></div>

      <p>The bibliographic reference database file can now be used for citation in a LaTeX document.</p>
      <br/>
      <h3>Using BibTeX Entries with DOI, URL,  and ISSN/ISBN</h3>
      <p>Different engines (BibTeX and Biber) and packages (<a href="http://www.ctan.org/pkg/biblatex">biblatex</a> and <a href="http://www.ctan.org/pkg/biblatex">natbib</a>) handle DOI, URL, and ISSN/ISBN data entries differently. These differences are outlined below.</p>
      <br/>
      <p><strong>Biblatex (Biber and BibTeX engines)</strong></p>
      <p>The <a href="http://www.ctan.org/pkg/biblatex">biblatex package</a> displays DOI, URL, and ISSN/ISBN by default. To prevent these data entries from being printed, set the <tt>doi</tt>, <tt>url</tt>, and <tt>isbn</tt> package options to <tt>false</tt>.</p>
      <div className="row">
      <div className="col-md-offset-2 col-md-8">

      <Code>{EXAMPLE2}</Code>

      </div></div>
      <br/>
      <p><strong>Natbib (BibTeX engine)</strong></p>
      <p>Support for DOI, URL, and ISSN/ISBN has been added to the bibliography style <tt>plainnat</tt>. These data entries will be printed unless they are removed or renamed. Loading the <a href="http://ctan.org/pkg/url">url package</a> prevents DOIs and URLs from sticking into the margin.</p>
      <div className="row">
      <div className="col-md-offset-2 col-md-8">
      <Code>{EXAMPLE3}</Code>
      </div></div>
      <br/>
      <p><strong>Natbib or without package (BibTeX engine)</strong></p>
      <p>Bibliography styles: <tt>plain</tt>, <tt>harvard</tt>, <tt>apalike</tt>, <tt>chicago</tt>, <tt>astron</tt>, and <tt>authordate</tt> do not support DOI, URL, and ISSN/ISBN and will therefore not produce these data entries, even if they are available.</p>
      <p></p>
      <div className="row">
      <div className="col-md-offset-2 col-md-8">
      <Code>{EXAMPLE4}</Code>
      </div></div>
      </div>
    );
  }
}

export default Help;
