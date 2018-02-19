// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NoMatch from './components/NoMatch';

const Root = () => (
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </React.Fragment>
  </Router>
);

render(<Root />, document.querySelector('#main'));
