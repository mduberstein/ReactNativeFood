import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  // results could have been called Restaurants or Businesses
  const [results, setResults] = useState([]);

  const searchApi = async () => {
    const response = await yelp.get('/search', {
      // per https://www.yelp.com/developers/documentation/v3/business_search, section Parameters,
      // they need to be added to a query string, and per axios docs the syntax below does just that
      // adding them as /search?limit=50
      params: {
        limit: 50,
        // term: term, // or use ES2015 syntax below
        term: term,
        location: 'san jose' // hardcoded
      }
    });
    // STATE MANAGEMENT
    setResults(response.data.businesses);
  };

  return (
    <View>
      <SearchBar
        term={term}
        // onTermChange={newTerm => setTerm(newTerm)}
        // onTermSubmit={() => searchApi()}
        // shorter syntax option
        onTermChange={setTerm}
        onTermSubmit={searchApi}
      />
      <Text>Search Screen</Text>
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
