var express = require("express");
var app = express();

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
    "Newport": "Rhode Island"
};


app.param('name', function(request, response, next){
    var name = request.params.name;
    var city = name[0].toLocaleUpperCase() + name.slice(1).toLowerCase();
    request.cityName = city;
    next();
});
    

app.get('/cities/:name', function (request, response){
    // var name = request.params.name;
    // var city = name[0].toLocaleUpperCase() + name.slice(1).toLowerCase();
    // var states = cities[city];
    var states = cities[request.cityName];
    
    if (!states) {
        response.status(404).json("No city found for " + request.params.name);
    } else {
        response.json(states);
    }
    //   if (request.query.limit > 0 && request.query.limit < cities.length) {
    //     response.json(cities.slice(0, request.query.limit));
    // } else if (request.query.limit > cities.length) {
    //     response.status(404).json("Limit must be " + cities.length + " or less");
    // } else {
    //     response.json(cities); 
    // }
});


app.get('/cities', function (request, response){

    if (request.query.limit > 0 && request.query.limit < cities.length) {
        response.json(cities.slice(0, request.query.limit));
    } else if (request.query.limit > cities.length) {
        response.status(404).json("Limit must be " + cities.length + " or less");
    } else {
        response.json(cities); 
    }
});

// app.get('/', function(request, response){
//   response.sendFile(__dirname + "/public/index.html");
// });

// CAN USE THIS GET REQUEST OR THE BELOW CODE SO THAT ALL FILES IN PUBLIC ARE RUN

app.use(express.static('public'));

app.listen(process.env.PORT), function(){
    console.log("listening!!");
};