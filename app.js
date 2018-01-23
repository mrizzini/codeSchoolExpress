var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });


// app.get('/', function(request, response){
//     response.send("Hello World"); 
// });
app.get('/name', function(request, response){
    var name = "Matt Rizzini";
    response.send("Hello, my name is " + name);
});
app.get('/redirect', function(request, response){
    response.redirect(301, '/surprise');
});
app.get('/surprise', function(request, response){
    response.send("Surprise! You are now here instead of /redirect");
});
app.get('/date', function(request, response){
    response.send("Currently, it is " + new Date());
});

var cities = {
    "Providence": "Rhode Island", 
    "Portland": "Maine", 
    "Boston": "Massachusetts", 
    "Miami": "Florida", 
    "Newport": "Rhode Island",
    "Burlington": "Vermont"
};

app.param('name', function(request, response, next){
    // var name = request.params.name;
    // var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    // request.cityName = city;
    request.cityName = parseCityName(request.params.name);
    next();
});
    
app.get('/cities/:name', function (request, response){
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
});

function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.get('/cities', function (request, response){
    
    if (request.query.limit > 0 && request.query.limit < cities.length) {
        response.json(cities.slice(0, request.query.limit));
    } else if (request.query.limit > cities.length) {
        response.status(404).json("Limit must be " + cities.length + " or less");
    } else {
        response.json(Object.keys(cities)); 
    }
});

app.post('/cities', parseUrlencoded, function(request, response){
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

var createCity = function(city, state){
    console.log("city in function is " + city + " state in function is " + state);
    cities[city] = state;
    console.log("function return " + city);
    return city; 
};

app.delete('/cities/:name', function(request, response){
   delete cities[request.cityName];
   response.sendStatus(200);
});

// app.get('/', function(request, response){
//   response.sendFile(__dirname + "/public/index.html");
// });

// CAN USE THIS GET REQUEST OR THE BELOW CODE SO THAT ALL FILES IN PUBLIC ARE RUN

app.use(express.static('public'));

app.listen(process.env.PORT), function(){
    console.log("listening!!");
};