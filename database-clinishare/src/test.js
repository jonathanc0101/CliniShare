import axios from 'axios';

axios
  .get('http://medicos:3000/')
  .then(res => {
    // console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });