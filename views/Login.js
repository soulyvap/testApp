import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ButtonGroup, Card} from 'react-native-elements';

const Login = ({navigation}) => {
  const [formToggle, setFormToggle] = useState(false);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('Token in storage', await userToken);
    if (userToken) {
      try {
        const userData = await getUserByToken(userToken);
        console.log('check token', userData);
        if (userData) {
          setUser(userData);
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

  return (
    <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Card>
          <ButtonGroup
            onPress={() => setFormToggle(!formToggle)}
            selectedIndex={formToggle ? 0 : 1}
            buttons={['Login', 'Register']}
          />
        </Card>
        {formToggle ? (
          <Card>
            <Card.Title>Login</Card.Title>
            <LoginForm navigation={navigation} />
          </Card>
        ) : (
          <Card>
            <Card.Title>Register</Card.Title>
            <RegisterForm
              setFormToggle={setFormToggle}
              navigation={navigation}
            />
          </Card>
        )}
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
