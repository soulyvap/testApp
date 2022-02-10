import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  ButtonGroup,
  ListItem as NBListItem,
} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation, myFiles}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const deletePost = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await deleteMedia(singleMedia.file_id, userToken);
    response && setUpdate(update + 1);
  };

  const deleteAlert = async () => {
    Alert.alert(
      'Deleting',
      'Do you really want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deletePost();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      <NBListItem
        bottomDivider={true}
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
      >
        <Avatar
          size={60}
          source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
        />
        <NBListItem.Content>
          <NBListItem.Title style={{fontSize: 20}}>
            {singleMedia.title}
          </NBListItem.Title>
          <NBListItem.Subtitle style={{height: 20, overflow: 'hidden'}}>
            {singleMedia.description}
          </NBListItem.Subtitle>
        </NBListItem.Content>
        {myFiles && (
          <ButtonGroup
            containerStyle={{width: 150}}
            buttons={['Modify', 'Delete']}
            onPress={(value) => {
              switch (value) {
                case 0:
                  navigation.navigate('Modify', {file: singleMedia});
                  break;
                case 1:
                  deleteAlert();
                  break;
                default:
                  break;
              }
            }}
          />
        )}
      </NBListItem>
    </>
  );
};

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleMedia: PropTypes.object.isRequired,
  myFiles: PropTypes.bool,
};

export default ListItem;
