import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import About from './components/About';
import Help from './components/Help';
import Terms from './components/Terms';
import Doi2Bib from './components/Doi2Bib';

class App extends Component {
  scrollToTop() {
    console.log('hello');
    setTimeout(function () { window.scrollTo(0, 0);});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/terms" component={Terms} />
              <Route path="/help" component={Help} />
              <Route path="/bib/:query" component={Doi2Bib} />
              <Route path="/bib" component={Doi2Bib} />
              <Route path="*" component={Doi2Bib} />
            </Switch>
          </div>
          <footer className="text-center">
            &copy; 2017 doi2bib
            &nbsp;
            <Link to="/"><i className="fa fa-home"></i></Link>
            &nbsp;
            <Link to="/terms">Terms</Link>
            &nbsp;
            <Link to="/help">Help</Link>
            &nbsp;
            <Link to="/about">About</Link>
            &nbsp;
            <a href="https://twitter.com/doi2bib" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
            &nbsp;
            <a href="https://github.com/davidagraf/doi2bib2" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg"></i></a>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
