import axios from 'axios';

axios
  .get('http://localhost:3000/clinishare')
  .then(res => {
    // console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });