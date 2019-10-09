import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  // results could have been called Restaurants or Businesses
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    console.log(`In call to searchApi with term '${searchTerm}'`);
    try {
      const response = await yelp.get('/search', {
        // per https://www.yelp.com/developers/documentation/v3/business_search, section Parameters,
        // they need to be added to a query string, and per axios docs the syntax below does just that
        // adding them as /search?limit=50
        params: {
          limit: 50,
          // term: term, // or use ES2015 syntax below, before Clip 96
          term: searchTerm,
          location: 'san jose' // hardcoded
        }
      });
      // STATE MANAGEMENT
      setResults(response.data.businesses);
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
    }
  };

  // Call searchApi when component is first rendered. BAD CODE!.
  // infinite loop: searchApi causes change of state, which causes re-rendering, which calls searchApi('pasta');
  // searchApi('pasta');
  // Good Code, second argument of [] causes the first to be run only on first rendering the component
  useEffect(() => {
    searchApi('pasta');
  }, []);

  return (
    <View>
      <SearchBar
        term={term}
        // onTermChange={newTerm => setTerm(newTerm)}
        // onTermSubmit={() => searchApi()}
        // shorter syntax option
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
