import React from 'react';
import {SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <>
      <SafeAreaView>
        <List navigation={navigation} myFiles={true} />
      </SafeAreaView>
    </>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
