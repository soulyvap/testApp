import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />
      <View style={styles.textSection}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.content}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#383E42',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 150,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  image: {
    flex: 1.5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textSection: {
    display: 'flex',
    flex: 2,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  content: {
    textAlign: 'justify',
    color: 'white',
    overflow: 'scroll',
  },
});

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
