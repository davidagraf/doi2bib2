import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import About from './components/About';
import Help from './components/Help';
import Terms from './components/Terms';
import Doi2Bib from './components/Doi2Bib';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div>
              <Link tabIndex="-1" to="/about">about</Link><br/>
              <Link tabIndex="-1" to="/terms">terms</Link><br/>
              <Link tabIndex="-1" to="/help">help</Link><br/>
              <Link tabIndex="-1" to="/bib">bib</Link><br/>
            </div>
            <div>
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/terms" component={Terms} />
                <Route path="/help" component={Help} />
                <Route path="/bib/:query" component={Doi2Bib} />
                <Route path="/bib" component={Doi2Bib} />
                <Route path="*" component={Doi2Bib}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
