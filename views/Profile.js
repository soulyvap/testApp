import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Button, Card} from 'react-native-elements';

const Profile = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Card
        containerStyle={{
          width: '80%',
          borderRadius: 10,
        }}
      >
        <Card.Title>Profile</Card.Title>
        <Card.Image source={{uri: avatar}} style={{marginBottom: 20}} />
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Full name: {user.full_name}</Text>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
          containerStyle={{
            marginVertical: 10,
          }}
        />
      </Card>
    </SafeAreaView>
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

export default Profile;
