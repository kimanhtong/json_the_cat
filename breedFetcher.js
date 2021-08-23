const request = require('request');
const fetchBreedDescription = function (breedName, callback) {
  if (breedName === null) {
    const errMsg = 'No breed found';
    return callback(errMsg, null);
  }
  const url = 'https://api.thecatapi.com/v1/breeds/';
  request(url, (error, response, body) => {
    if (error) {
      const errMsg = `Error encountered: ${error.message}`; // Print the error if one occurred
      return callback(errMsg, null);
    }
    if (response.statusCode !== 200) {
      const errMsg = `Unexpected response from server: ${response.statusCode} - ${response.message}`; // Print the response status code if a response was received
      return callback(errMsg, null);
    }
    const data = JSON.parse(body);
    try {
      for (const breed of data) {
        if (breed.name === breedName) {
          return callback(null, breed.description);
        }
      }
    } catch (err) {
      const errMsg = `${err.name} : ${err.message}`;
      return callback(errMsg, null);
    }
    const errMsg = `The breed doesn't exist`;
    return callback(errMsg, null);
  });
};
module.exports = { fetchBreedDescription };
