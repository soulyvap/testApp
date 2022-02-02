import React from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
<<<<<<< Updated upstream
import {Card, Icon, Text, ThemeProvider} from 'react-native-elements';
=======
import {Card, Image, Text, ThemeProvider} from 'react-native-elements';
>>>>>>> Stashed changes
import GlobalStyles from '../utils/GlobalStyles';

const theme = {};

const Single = ({route}) => {
  const screenHeight = Dimensions.get('window').height;
  const file = route.params.file;
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <Card containerStyle={{height: '85%'}}>
          <Card.Image
            style={{height: screenHeight * 0.5}}
            source={{uri: uploadsUrl + file.thumbnails.w640}}
          />
          <div
            style={{
              marginTop: screenHeight * 0.05,
              height: screenHeight * 0.2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="image" />
            <div
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
              <Text>By {file.user_id}</Text>
            </div>
          </div>
        </Card>
      </SafeAreaView>
    </ThemeProvider>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
