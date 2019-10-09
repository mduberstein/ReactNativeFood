import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default () => {
  // Refactoring Part 1: extract from SearchScreen function everything related to using yelp
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

   // GOOD CODE !!!, second argument of [] causes the first to be run only on first rendering the component
   useEffect(() => {
     searchApi('pasta');
   }, []);
   
   // Refactoring Part 2, retturn everyhing that from here needed in the SearchScreen function

   return [searchApi, results, errorMessage];
};