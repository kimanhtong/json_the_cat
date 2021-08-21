const request = require('request');
const url = 'https://api.thecatapi.com/v1/breeds/';
if (process.argv[2] === '' || process.argv[2] === undefined) {
  console.log('No breed found');
} else {
  const breedName = process.argv[2];
  request(url, (error, response, body) => {
    if (error) {
      console.log(`Error encountered: ${error.message}`); // Print the error if one occurred
      return;
    }
    if (response.statusCode !== 200) {
      console.log(`Unexpected response from server: ${response.statusCode} - ${response.message}`); // Print the response status code if a response was received
      return;
    }
    const data = JSON.parse(body);
    try {
      for (const breed of data) {
        if (breed.name === breedName) {
          console.log(breed.description);
          return;
        }
      }
    } catch (err) {
      console.log(`${err.name} : ${err.message}`);
    }
    console.log(`The breed doesn't exist`);
  });
}
