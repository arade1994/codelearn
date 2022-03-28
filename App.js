import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import Navigator from './src/navigation/Navigator';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}

export default App