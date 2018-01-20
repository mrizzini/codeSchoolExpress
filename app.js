var express = require("express");
var app = express();

app.get('/', function(request, response){
    response.send("Hello World"); 
  //response.sendFile(__dirname + "/public/index.html");
});

app.get('/name', function(request, response){
    response.send('Matt Rizzini');
});

app.get('/redirect', function(request, response){
    response.redirect(301, '/surprise');
});


app.listen(process.env.PORT), function(){
    console.log("listening!!");
};