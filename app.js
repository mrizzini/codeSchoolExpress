var express = require("express");
var app = express();

app.get('/', function(request, response){
    response.send("Hello World"); 
  //response.sendFile(__dirname + "/public/index.html");
});

app.get('/name', function(request, response){
    var name = "Matt Rizzini"
    response.send("Hello, my name is " + name);
});

app.get('/redirect', function(request, response){
    response.redirect(301, '/surprise');
});

app.get('/surprise', function(request, response){
    response.send("Surprise! Your are now here instead of /redirect");
});

app.get('/date', function(request, response){
    response.send("Currently, it is " + new Date());
});

app.listen(process.env.PORT), function(){
    console.log("listening!!");
};