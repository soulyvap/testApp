import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('Token in storage', await userToken);
    if (userToken) {
      try {
        const userData = await getUserByToken(userToken);
        console.log('check token', userData);
        if (userData) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    const data = {
      username: 'souly',
      password: 'souly12345',
    };
    try {
      const userData = await postLogin(data);
      const token = await userData.token;
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
    } catch (error) {
      throw new Error(error.message);
    }
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
