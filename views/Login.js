import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = AsyncStorage.getItem('userToken');
    console.log('Token in storage', await userToken);
    if ((await userToken) === 'abc') {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
