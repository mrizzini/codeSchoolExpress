var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
    "Providence": "Rhode Island", 
    "Portland": "Maine", 
    "Boston": "Massachusetts", 
    "Miami": "Florida", 
    "Newport": "Rhode Island",
    "Burlington": "Vermont"
};

router.route('/')
    .get(function (request, response){
        if (request.query.limit > 0 && request.query.limit < cities.length) {
            response.json(cities.slice(0, request.query.limit));
        } else if (request.query.limit > cities.length) {
            response.status(404).json("Limit must be " + cities.length + " or less");
        } else {
            console.log("limit test");
            response.json(Object.keys(cities)); 
        }
    })
    .post(parseUrlencoded, function(request, response){
        if (request.body.city.length >= 4 && request.body.state.length >= 2) { // checks if user input matches requirements
        request.body.city = request.body.city[0].toUpperCase() + request.body.city.slice(1).toLowerCase(); //turns user input city into correct case
        request.body.state = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase(); // turns user input state into correct case
        var city = createCity(request.body.city, request.body.state);
        console.log("city is " + request.body.city);
        console.log("state is " + request.body.state);
        response.status(201).json(city);
        } else {
            response.status(400).json('City must be at least 4 characters long and state must be at least 2'); // else returns error
        }
    // var newCity = request.body;
    // cities[newCity.city] = newCity.state;
    // response.status(201).json(newCity.city);
    });


router.route('/:name')
    .all(function (request, response, next) {
        request.cityName = parseCityName(request.params.name);
        // var name = request.params.name;
        // var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
        // request.cityName = city;
        next();
    })
    .get(function (request, response){
        // var name = request.params.name;
        // var city = name[0].toLocaleUpperCase() + name.slice(1).toLowerCase();
        // var states = cities[city];
        var cityName = parseCityName(request.params.name);
        var cityInfo = cities[cityName];
        var states = cities[request.cityName];
    
        if (cityInfo) {
            response.json(cityInfo);
        } else {
            response.status(404).json("No city found for " + cityName);
        }
        //   if (request.query.limit > 0 && request.query.limit < cities.length) {
        //     response.json(cities.slice(0, request.query.limit));
        // } else if (request.query.limit > cities.length) {
        //     response.status(404).json("Limit must be " + cities.length + " or less");
        // } else {
        //     response.json(cities); 
        // }
    })
    .delete(function(request, response){
        delete cities[request.cityName];
        response.sendStatus(200);
    });


function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

var createCity = function(city, state){
    console.log("city in function is " + city + " state in function is " + state);
    cities[city] = state;
    console.log("function return " + city);
    return city; 
};

module.exports = router;