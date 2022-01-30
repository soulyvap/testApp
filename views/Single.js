import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Icon, Image, Text, ThemeProvider} from 'react-native-elements';
import GlobalStyles from '../utils/GlobalStyles';
import {useTag} from '../hooks/ApiHooks';

const Single = ({route}) => {
  const screenHeight = Dimensions.get('window').height;
  const file = route.params.file;
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <Card containerStyle={{height: '85%', borderRadius: 10}}>
          <Card.Image
            style={{height: screenHeight * 0.5, marginBottom: 20}}
            source={{uri: uploadsUrl + file.thumbnails.w640}}
          />
          <Card.Title style={{textAlign: 'left', fontSize: 20}}>
            {file.title}
          </Card.Title>
          <Text>{file.description}</Text>
          <div
            style={{
              marginTop: screenHeight * 0.05,
              height: screenHeight * 0.2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: '50%',
              }}
              resizeMode="cover"
              source={{uri: avatar}}
            />
            <Text>{file.user_id}</Text>
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
