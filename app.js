var express = require("express");
var app = express();
var cities = require('./routes/cities'); //requires cities routes file and assign it to cities
app.use('/cities', cities); // mounts the router. this makes it so in cities.js we dont need /cities 
                            // mount cities routes in cities path. all requests to cities path are dispatched to this router
// app.get('/', function(request, response){
//     response.send("Hello World"); 
// });

app.route('/name')
    .get(function(request, response){
        var name = "Matt Rizzini";
        response.send("Hello, my name is " + name);
});

app.route('/redirect')
    .get(function(request, response){
        response.redirect(301, '/surprise');
});
 
app.route('/surprise')
    .get(function(request, response){
        response.send("Surprise! You are now here instead of /redirect");
});
 
app.route('/date')
    .get(function(request, response){
        response.send("Currently, it is " + new Date());
});

// app.get('/', function(request, response){
//   response.sendFile(__dirname + "/public/index.html");
// });

// CAN USE THIS GET REQUEST OR THE BELOW CODE SO THAT ALL FILES IN PUBLIC ARE RUN

app.use(express.static('public'));

app.listen(process.env.PORT), function(){
    console.log("listening!!");
};