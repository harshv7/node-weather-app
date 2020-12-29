const request = require('request');

const weather = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f7cb432ca451466b84ddb3cdefee2cb1&query='+encodeURIComponent(latitude)+ ','+encodeURIComponent(longitude)+'&units=s'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Location Service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {
            const data = body.current;
            callback(undefined, data);
           }
    });
};

module.exports= weather;