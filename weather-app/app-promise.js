const yargs = require('yargs');
const axios = require('axios');

//setup yargs
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

//encode address given and use in url request
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//Axios http get request
axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address');
	}

	//get longitude and latitude from response
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/8ad3326ee9c94b5e5c774f5cff56dfd5/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);

	//return promise with url formulated from response lat and lng
	return axios.get(weatherUrl);

}).then((response) => {
	//get temperature and display from response
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It is currently: ${temperature}. It feels like ${apparentTemperature}.`);

}).catch((error) => {
	//error handling
	if (error.code === 'ENOTFOUND'){
		console.log('Unable to connect to API servers');
	} else {
		console.log(error.message);
	}
});
