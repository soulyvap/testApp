import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator />
      <StatusBar backgroundColor="#007" />
    </>
  );
};

export default App;
