import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainProvider>
          <Navigator />
        </MainProvider>
        <StatusBar backgroundColor="#007" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
