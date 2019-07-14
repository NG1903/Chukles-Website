const request = require('request');

const jokeGenerator = function(number, callback) {
  const url = `http://api.icndb.com/jokes/random/${number}`;

  request({url, json : true}, (error, response) => {
    if(error){
      callback('Error while retrieving Data', undefined);
    }
    else if(number <= 0 || number > 574){
      callback('Invalid Input / Limit Exceeds Request number', undefined)
    }
    else{
      callback(undefined, response.body.value);
    }
  });
}

module.exports = jokeGenerator;
