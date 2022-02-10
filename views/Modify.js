import React, {useContext, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, Text} from 'react-native';
import {Button, Card, Input, ThemeProvider} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';

const theme = {
  Button: {
    buttonStyle: {
      marginVertical: 10,
    },
  },
};

const Modify = ({navigation, route}) => {
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const file = route.params.file;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  useEffect(() => {
    console.log(file);
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log('upload response', response);

      if (response) {
        Alert.alert('File', 'updated', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(!update);
              navigation.navigate('My Files');
            },
          },
        ]);
      }
    } catch (error) {
      console.log('onSubmit upload problem', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView>
        <Card>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 1,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="Title"
                errorMessage={errors.title && <Text>This is required.</Text>}
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 30,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="Description"
                errorMessage={errors.description}
              />
            )}
            name="description"
          />

          <Button
            title="Update"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        </Card>
      </ScrollView>
    </ThemeProvider>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
