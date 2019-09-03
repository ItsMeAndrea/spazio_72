import React, { Component } from 'react';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
