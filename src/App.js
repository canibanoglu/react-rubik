import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { whyDidYouUpdate } from 'why-did-you-update';

import './assets/styles/styles.scss';
import store from './store/store';
import Home from './components/Home';

if (process.env.NODE_ENV !== 'production') {
  let createClass = React.createClass; // eslint-disable-line no-unused-vars
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass;
    },
  });

  const ignorePatterns = [
    '^Connect',
    '^Route',
    '^Switch',
    '^Link',
  ];

  whyDidYouUpdate(React, {
    exclude: new RegExp(ignorePatterns.join('|')),
  });
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
