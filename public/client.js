/*global $ */

$(document).ready(function() {

console.log("cities test");

$(function (){
    console.log("cities test2");
    $.get('/cities', appendToOptions); 
        console.log("cities test3");

        function appendToOptions(cities) {
            var options = [];
            for (var i in cities) {
                options.push($('<option>', {text: cities[i]}));
            }
            $('#cityOptions').append(options);
        }
    
});




});