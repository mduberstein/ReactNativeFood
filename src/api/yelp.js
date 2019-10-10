import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer DeXPwWio49WRUnmJv_76exXJdcA0z4r5bBn1nqFyZo-A1_VCUbyKw1uD8OYRF2-Mlusz5bszEVbJPAr-MUr1AVPwsjR-9Gf0qnKWom6Zw-mm7sTL_WZwYpJFMvadXXYx'
  }
});



// usage: yelp.get('/search');
// yelp.get('/<id>');