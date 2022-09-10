const axios = require('axios');

axios
  .get('http://192.168.43.67:3000/')
  .then(res => {
    // console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });