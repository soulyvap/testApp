import React, {useCallback, useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet, Text} from 'react-native';
import {Button, Card, Input, ThemeProvider} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';
import {Video} from 'expo-av';

const theme = {
  Button: {
    buttonStyle: {
      marginVertical: 10,
    },
  },
};

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
  );
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage(
      'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
    );
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please, select a file');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token
      );
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(!update);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (error) {
      console.log('onSubmit upload image problem', error);
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

          {type === 'image' ? (
            <Card.Image
              source={{
                uri: image,
              }}
              onPress={pickImage}
            />
          ) : (
            <Video
              source={{uri: image}}
              style={styles.image}
              useNativeControls={true}
              resizeMode="cover"
              onError={(err) => {
                console.error('video', err);
              }}
            />
          )}

          <Button title="Select file" onPress={pickImage} />
          <Button
            title="Upload"
            onPress={handleSubmit(onSubmit)}
            disabled={!imageSelected}
            loading={loading}
          />
          <Button title="Reset form" onPress={reset} />
        </Card>
      </ScrollView>
    </ThemeProvider>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

export default Upload;
