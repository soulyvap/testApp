import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Button, ThemeProvider} from 'react-native-elements';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag, postTag} = useTag();
  console.log('userInfo: ', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const createAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(data, 'token');
      console.log(await result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const theme = {
    Button: {
      buttonStyle: {
        marginVertical: 10,
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Card.Title>Profile</Card.Title>
        <Card.Image style={{marginBottom: 10}} source={{uri: avatar}} />
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Fullname: {user.full_name}</Text>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        />
      </Card>
    </ThemeProvider>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
