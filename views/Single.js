import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, Card, Text, ThemeProvider} from 'react-native-elements';
import GlobalStyles from '../utils/GlobalStyles';
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const theme = {};

const Single = ({route}) => {
  const screenHeight = Dimensions.get('window').height;
  const file = route.params.file;
  const [username, setUsername] = useState('unknown');
  const {getUserById} = useUser();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const [likes, setLikes] = useState(0);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

  const fetchOwner = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserById(file.user_id, userToken);
      setUsername(user.username);
    } catch (error) {
      console.error('fetchOwner', error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      const avatarFetched = await avatarArray.pop();
      setAvatar(uploadsUrl + avatarFetched.filename);
    } catch (error) {
      console.error('fetchAvatar', error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes', error.message);
    }
  };

  const createLike = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await postFavourite(file.file_id, userToken);
    } catch (error) {
      console.error('createLike', error.message);
    }
  };

  const deleteLike = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, userToken);
      response && setUserLike(false);
    } catch (error) {
      console.error('deleteLikes', error.message);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [createLike, deleteLike]);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <Card containerStyle={{height: '95%'}}>
          {file.media_type === 'image' ? (
            <Card.Image
              style={{height: screenHeight * 0.5}}
              source={{uri: uploadsUrl + file.thumbnails.w640}}
            />
          ) : (
            <Video
              source={{uri: uploadsUrl + file.filename}}
              style={styles.image}
              useNativeControls={true}
              resizeMode="cover"
              onError={(err) => {
                console.error('video', err);
              }}
            />
          )}

          <View
            style={{
              marginTop: screenHeight * 0.05,
              height: screenHeight * 0.2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar source={{uri: avatar}} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 5,
                marginLeft: 10,
              }}
            >
              <Card.Title style={{textAlign: 'left', fontSize: 20}}>
                {file.title}
              </Card.Title>
              <Text>{file.description}</Text>
              <Text>By {username}</Text>
              <Text>{likes.length + ' likes'}</Text>
              <Button
                title="like"
                disabled={userLike}
                onPress={() => {
                  createLike();
                }}
              />
              <Button
                title="unlike"
                disabled={!userLike}
                onPress={() => {
                  deleteLike();
                }}
              />
            </View>
          </View>
        </Card>
      </SafeAreaView>
    </ThemeProvider>
  );
};

Single.propTypes = {
  route: PropTypes.object,
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

export default Single;
