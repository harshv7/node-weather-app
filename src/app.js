const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const weather = require('../utils/weather');
const app = express();

// Define path for express config.
const publicDirPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set up handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

// set up static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Welcome to Weather Info Page",
        name: "harshv"
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page info!!!",
        name: "harsh"
    });
})
app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({ error: 'address must be provided' })
    } else {
        geocode(address, (error, data) => {
            if (error) {
                res.send({
                    error:error
                })
            } else {
                console.log(address + ': Latitude ' + data[1] + ' Longititude ' + data[0]);
                weather(data[0].toString(), data[1].toString(), (error, { weather_descriptions, temperature } = {}) => {
                    if (error) {
                        res.send({
                            error:error
                        })
                        // console.log(error)
                    } else {
                        res.send({
                            Address: address + ' weather status ' + weather_descriptions + ' and tempature is ' + temperature

                        })
                        // console.log(address + ' weather status ' + weather_descriptions + ' and tempature is ' + temperature)

                    }
                })
            }
        })
    }

    /* res.send({
        Address: req.query.address
    }) */
});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'you must provide search term' })
    }
    console.log(req.query)
    res.send({
        products: []
    })

});
app.get('/geocode', (req, res) => {
    res.send([{
        lat: '34.05',
        lon: '-34.25',
        location: 'bangalore'
    }, {
        lat: '18.05',
        lon: '-33.25',
        location: 'mysore'
    }])
});

app.get('/about/*', (req, res) => {
    res.send('404 about Page')
})

app.get('*', (req, res) => {
    res.send('404 Page')
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
});