import React from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
