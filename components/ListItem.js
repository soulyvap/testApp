import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as NBListItem} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <>
      <NBListItem containerStyle={{height: 70}} bottomDivider={true}>
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
        <Button
          titleStyle={{fontSize: 14}}
          buttonStyle={{
            paddingHorizontal: 15,
            paddingVertical: 4,
            borderRadius: 5,
          }}
          title={'View'}
          onPress={() => {
            navigation.navigate('Single', {file: singleMedia});
          }}
        />
      </NBListItem>
    </>
  );
};

// const ListItem2 = ({singleMedia, navigation}) => {
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('Single', {file: singleMedia});
//       }}
//     >
//       <Image source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}} />
//       <View>
//         <Text>{singleMedia.title}</Text>
//         <Text>{singleMedia.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
