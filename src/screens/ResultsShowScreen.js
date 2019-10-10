import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  // when the type of the state is object, null is a legitimate initial value
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  // console.log(`id: ${id}`);
  console.log('Returned Restaurant:');
  console.log(result);

  // means getBusiness
  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  // second argument [] guarantees that the first is called only at first rendering
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    // don't show anything on the screen before you got result
    return null;
  }
  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image:{
    height: 200,
    width: 300
  }
});

export default ResultsShowScreen;
