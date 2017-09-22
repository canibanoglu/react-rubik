import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './assets/styles/styles.scss';
import store from './store/store';
import Home from './components/Home';
import Rubik from './components/Rubik';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rubik" render={()=><Rubik width={window.innerWidth} height={window.innerHeight} />}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
