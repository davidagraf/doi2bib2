import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Help from './components/Help';
import Terms from './components/Terms';
import Doi2Bib from './components/Doi2Bib';

class App extends Component {
  render() {
    return (
      <div class="text-center">
        <BrowserRouter>
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
