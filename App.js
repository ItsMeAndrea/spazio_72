import React, { Component } from 'react';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
