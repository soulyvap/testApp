import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  const file = route.params.file;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: uploadsUrl + file.thumbnails.w640}}
        style={{width: 300, height: 300}}
      ></Image>
      <Text>{file.title}</Text>
      <Text>{file.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
