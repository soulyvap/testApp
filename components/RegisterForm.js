import React from 'react';
import {View, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';

const RegisterForm = ({setFormToggle}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirm_password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirm_password;
      const userData = await postUser(data);
      console.log('Created successfully with id: ', userData);
      if (userData) {
        Alert.alert('Success', 'User created');
        setFormToggle(true);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              if (available) {
                return true;
              } else {
                return 'Username is already taken!';
              }
            } catch (error) {
              console.error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 5,
            message: 'Password must be at least 5 characters',
          },
          pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
            message:
              'Please enter a password with a capital letter and a number at least',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'This is required.'},
          validate: (value) => {
            const {password} = getValues();
            if (password === value) {
              return true;
            } else {
              return 'Passwords must match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm password"
            errorMessage={
              errors.confirm_password && errors.confirm_password.message
            }
          />
        )}
        name="confirm_password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /\S+@\S+\.\S+$/i,
            message: 'This is not an email.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Fullname must be at least 3 characters',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

RegisterForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default RegisterForm;
