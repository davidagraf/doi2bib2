import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import About from './components/About';
import Doi2Bib from './components/Doi2Bib';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
                <Route path="/about" children={<About/>} />
                <Route path="/terms" children={<About/>} />
                <Route path="/help" children={<About/>} />
                <Route path="/bib" children={<Doi2Bib/>} />
                <Route path="*" children={<About/>}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
