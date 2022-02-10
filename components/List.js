import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const List = ({navigation, myFiles}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update, myFiles);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          myFiles={myFiles}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFiles: PropTypes.bool,
};

export default List;
