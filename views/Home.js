import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import List from '../components/List';
import {Settings} from 'react-native-feather';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  const image = {
    uri: 'https://thumbs.dreamstime.com/b/purple-blue-delicate-cute-nice-plain-simple-background-small-dots-graininess-lightness-fabulous-effect-201489104.jpg',
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.background}
          imageStyle={styles.backImg}
        >
          <Settings stroke={'white'} style={styles.settingsBtn} />
          <Text style={styles.label}>Random Uploads</Text>
        </ImageBackground>
        <List navigation={navigation} style={styles.list} />
      </SafeAreaView>
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'relative',
    marginVertical: 10,
    height: Dimensions.get('screen').height * 0.3,
    resizeMode: 'stretch',
  },
  backImg: {
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    color: 'white',
    fontSize: 30,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  settingsBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Home;
