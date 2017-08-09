const request = require('request');

//accesss weather from forecast.io using latitude and longitude
var getWeather = (lat,lng,callback) => {
  request({
  	url: `https://api.darksky.net/forecast/8ad3326ee9c94b5e5c774f5cff56dfd5/${lat},${lng}`,
  	json: true
  }, (error, response, body) => {
    //error checking
  	if (!error && response.statusCode === 200){
  		callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
  		callback('Unable to fetch weather');
  	}
  });
};
module.exports.getWeather = getWeather;
