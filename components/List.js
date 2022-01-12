/* eslint-disable prettier/prettier */

import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useState, useEffect} from 'react';

const List = () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      };
      const json = await response.json();
      setMediaArray(json);
    } catch (error) {
      console.error(error);
    }
    console.log(mediaArray);
  };
  useEffect(async () => {
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
