const request = require('request');
const geocode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyc2hhdiIsImEiOiJja2FrNmQxY3EwYWhmMnduMW9lYm83bzBqIn0.fvYr5o8-nh6cPar7HxbxPQ';
    request({ url: geoURL, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Location Service', undefined);
        } else if (!body.features.length) {
            callback('unable to find location, try another search', undefined);
        } else {
            const data = body.features[0].center;
            // console.log('Los Angles: Latitude ' + data[1] + ' Longititude ' + data[0]);
            callback(undefined, data)
        }
    });
};

module.exports= geocode;