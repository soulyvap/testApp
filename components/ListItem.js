import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
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
    backgroundColor: '#ccc',
    marginBottom: 5,
    padding: 20,
    height: 200,
  },
  image: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  textSection: {
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'justify',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
