import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Authorization from './components/Authorization/Authorization.jsx';
import Admin from './components/Admin/Admin.jsx';

import mainReducer from './store/reducers';


let store = createStore(mainReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Authorization></Authorization>
          </Route>
          <Route path='/admin'>
            <Admin></Admin>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
