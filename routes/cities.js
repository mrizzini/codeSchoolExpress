var express = require('express'); // requires express module
var router = express.Router(); // calls router function. returns router instance, mounted as middleware
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

router.route('/') // router object. goes to whevever path is mounted. in this case, /cities
    .get(function (request, response){
        if (request.query.limit > 0 && request.query.limit <= Object.keys(cities).length) { // checks if user input limit is greater than 0 and less than or equal to lengh of cities object
            response.json(Object.keys(cities).slice(0, request.query.limit)); // this had to be changed because it is no longer an array
        } else if (request.query.limit > Object.keys(cities).length) {
            response.status(404).json("Limit must be " + Object.keys(cities).length + " or less");
        } else {
            console.log("limit test");
            response.json(Object.keys(cities)); // if no limit set, or if it doesn't pass tests, return the keys (names) of the cities object
        }
    }) // function chaining
    .post(parseUrlencoded, function(request, response){
        if (request.body.city.length >= 4 && request.body.state.length >= 2) { // checks if user input matches requirements
        request.body.city = request.body.city[0].toUpperCase() + request.body.city.slice(1).toLowerCase(); //turns user input city into correct case
        request.body.state = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase(); // turns user input state into correct case
        var city = createCity(request.body.city, request.body.state); // takes city and state from user and runs createCity function
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


router.route('/:name') // dynamic name, user inputs city name of their choice
    .all(function (request, response, next) { // this runs on all requests for this path. takes the name of the city and puts it in correct case. turns providence to Providence
        request.cityName = parseCityName(request.params.name);
        // var name = request.params.name;
        // var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
        // request.cityName = city;
        next();
    })
    .get(function (request, response){ // after a request comes into this route, it hits all then filters thru get or delete
        // var name = request.params.name;
        // var city = name[0].toLocaleUpperCase() + name.slice(1).toLowerCase();
        // var states = cities[city];
        var cityName = parseCityName(request.params.name);
        var cityInfo = cities[cityName];
        var states = cities[request.cityName];
    
        if (cityInfo) { // if a city name is enterted and it exits, you get the state of that city
            response.json(cityInfo);
        } else {
            response.status(404).json("No city found for " + cityName); // else you get the error
        }
        //   if (request.query.limit > 0 && request.query.limit < cities.length) {
        //     response.json(cities.slice(0, request.query.limit));
        // } else if (request.query.limit > cities.length) {
        //     response.status(404).json("Limit must be " + cities.length + " or less");
        // } else {
        //     response.json(cities); 
        // }
    })
    .delete(function(request, response){ // delete the city selected
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

module.exports = router; // exports the router as a Node module, so we access this in app.js